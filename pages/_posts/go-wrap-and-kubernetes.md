---
title: Go, Wrap and Kubernetes
layout: post
date: 2019-05-29 23:18:00
tags:
  - wrap
  - kubernetes
  - go
---

<style>
img {
  width: 100%;
}
</style>

Let me start by introducing _[wrap 🍃🔥](https://github.com/lucacasonato/wrap)_. Wrap is a library for Go that wraps the [mongo-go-driver](https://github.com/mongodb/mongo-go-driver) in a nicer syntax that requires less thinking and enables more doing. Everything is made to feel like Google Firestore but with the power of MongoDB.

## What are we building?

I will build a simple api to list all books or only the books from a certain author. We will use Go to write the webserver. It will run on Google Kubernetes Engine and will use MongoDB with Wrap for data storage. Everything will be super scalable (hopefully).

## Prerequisites

Make sure you have **[kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)** and **[docker](https://docs.docker.com/install/)** installed (and if not install them).

We will use Google Kubernetes Enginge for our cluster. To use services on Google Cloud Platform you need to have a Google Account and set up a Google Cloud Project. To do this go to **[the console](https://console.cloud.google.com/)** and create a new project. I will call my project `blog-kube-test`.

![Creating the project](/images/go-wrap-and-kubernetes/create-google-cloud-project.jpg)

You should now **[install the gcloud cli tool](https://cloud.google.com/sdk/gcloud/)** so we can start managing clusters right from the command line.

Once you have installed `gcloud` you can sign in with your Google Account, select your new project, set a default datacenter location and configure `docker` to be able to communicate with Google Cloud:

```sh
gcloud auth login
gcloud config set project blog-kube-test     # replace 'blog-kube-test' with the name of your project
gcloud config set compute/zone europe-west4-b
gcloud auth configure-docker
```

## Setting up Kubernetes

We can now create a Kubernetes cluster in the **[Google Cloud Platform Console](https://console.cloud.google.com/kubernetes/list)**. Make sure to open the Kubernetes Engine panel and click on `Create cluster`. On the side select the `Your first cluster` template. Enter a name for your cluster (eg. blog-cluster) and select your zone. This should be the same as the one you configured `gcloud` with before. Select the latest available version as the master version.

Below the global cluster settings you have your node pool settings. Here you can specify what resources Kubernetes can use. For now you can select `small` as your machine type. Set the node count to **2**.

![Create the cluster](/images/go-wrap-and-kubernetes/create-cluster.jpg)

Now you can create your cluster. This will take about 5 minutes.

> Make sure to delete or shut down you cluster by reducing it to 0 nodes when you are done using it. Leaving it running might cost you money!

## Building the app

While the cluster is being created we can start making our app. Open a new folder on your system and create a go module using `go mod init [your_repo_path]` (eg. `go mod init github.com/lucacasonato/go-wrap-kubernetes`). Then create a `main.go` file.

> The full source code for the finished app is located at https://github.com/lucacasonato/go-wrap-kubernetes

```go
// main.go

package main

import (
	"net/http"
)

func list(w http.ResponseWriter, r *http.Request) {
	// gets executed when all books are requested
}

func author(w http.ResponseWriter, r *http.Request) {
	// gets executed when all books from a specific author are requested
}

func main() {
	http.HandleFunc("/", list)
	http.HandleFunc("/author/{author}", author)
	http.ListenAndServe(":5000", nil)
}
```

All of the http boilerplate is now added. Create a `db.go` file to place all of your database interaction functions into.

```go
// db.go

package main

// Book info
type Book struct {
	Name   string
	Author string
	ISBN   string
}

func init() {
	// initalize database

	// add some books

	// create an index
}

func allBooks() ([]Book, error) {
	// get all books

	return []Book{}, nil
}

func authorBooks(author string) ([]Book, error) {
	// get all books for a specific author

	return []Book{}, nil
}
```

Lets start by implementing all of the http logic first. When a user calls `/` we want to get all books from the server and send them back as JSON.

```go
// main.go

func list(w http.ResponseWriter, r *http.Request) {
	books, err := allBooks()
	if err != nil {
		http.Error(w, err.Error(), 500)
	}

	err = json.NewEncoder(w).Encode(books)
	if err != nil {
		http.Error(w, err.Error(), 500)
	}
}
```

Lets also implement the same for `/author` but we will first get the `author` query parameter:

```go
// main.go

func author(w http.ResponseWriter, r *http.Request) {
	author := r.FormValue("author")

	books, err := authorBooks(author)
	if err != nil {
		http.Error(w, err.Error(), 500)
	}

	err = json.NewEncoder(w).Encode(books)
	if err != nil {
		http.Error(w, err.Error(), 500)
	}
}
```

Now we are done with the http logic. We will now use _wrap_ to setup mongodb database.

```go
// db.go

import (
	"github.com/lucacasonato/wrap"
)

...

var books *wrap.Collection

func init() {
	// initalize database
	client, err := wrap.Connect("mongodb://mongo-0.mongo,mongo-1.mongo:27017", 5*time.Second) // create a new client with a 5 second timeout
  if err != nil {
		panic(err)
	}

	db := client.Database("main")
	books = db.Collection("books")
	err = books.Delete() // remove old data from collection
	if err != nil {
		panic(err)
	}

	// add some books
	_, err = books.Add(&Book{
		Name:   "The Go Programming Language",
		Author: "Alan A. A. Donovan",
		ISBN:   "0134190440",
	})
	if err != nil {
		panic(err)
	}

	_, err = books.Add(&Book{
		Name:   "Kubernetes: The Complete Guide To Master Kubernetes",
		Author: "Joseph D. Moore",
		ISBN:   "1096165775",
	})
	if err != nil {
		panic(err)
	}

	_, err = books.Add(&Book{
		Name:   "Mastering MongoDB 4.x: Expert techniques to run high-volume and fault-tolerant database solutions using MongoDB 4.x",
		Author: "Alex Giamas",
		ISBN:   "1789617871",
	})
	if err != nil {
		panic(err)
	}

	// create an index
	err = books.CreateIndex(map[string]wrap.Index{
		"name": wrap.TextIndex,
	})
	if err != nil {
		panic(err)
	}
}
```

We can now set up the query functions

```go
// db.go


func allBooks() ([]Book, error) {
	iterator, err := books.
		All().
		DocumentIterator()
	if err != nil {
		return nil, err
	}
	defer iterator.Close()

	b := []Book{}

	for iterator.Next() {
		book := Book{}

		err = iterator.DataTo(&book)
		if err != nil {
			return nil, err
		}

		b = append(b, book)
	}

	return b, nil
}

func authorBooks(author string) ([]Book, error) {
	iterator, err := books.
		Where(filter.TextSearch(author)).
		DocumentIterator()
	if err != nil {
		return nil, err
	}
	defer iterator.Close()

	b := []Book{}

	for iterator.Next() {
		book := Book{}

		err = iterator.DataTo(&book)
		if err != nil {
			return nil, err
		}

		b = append(b, book)
	}

	return b, nil
}
```

## Setting up MongoDB

The app is now ready. Before we can deploy it to Kubernetes we need to set up our MongoDB instance on Kubernetes.

Setup `kubectl` to work with your new cluster:

```sh
gcloud container clusters get-credentials blog-cluster
kubectl create clusterrolebinding my-cluster-admin-binding --clusterrole=cluster-admin --user=$(gcloud info --format="value(config.account)") --serviceaccount=default:default
```

Download the mongodb deployment configuration file **[mongodb.yaml](/images/go-wrap-and-kubernetes/mongodb.yaml)** and place it in your project folder.

Now you can deploy the MongoDB cluster to Kubernetes and wait until 2/2 deployments are done:

```sh
kubectl apply -f mongodb.yaml
kubectl get statefulsets mongo --watch
```

Once all deployments are done press Ctrl-C.

## Deploying the app

We are now finally ready to deploy the app. Start by placing this **[Dockerfile](/images/go-wrap-and-kubernetes/Dockerfile)** in your project folder.

Now you can build and push your container to Google Container Registry. This is a private container registry for your project.

> in the following commands replace the project name (`blog-kube-test`) with your own project name

```sh
docker build -t gcr.io/blog-kube-test/go-wrap-kubernetes:v0.1.0 .
docker push gcr.io/blog-kube-test/go-wrap-kubernetes:v0.1.0
```

You have now pushed your container to the registry. Lets deploy it to Kubernetes. To do this place the deployment configuration file **[app.yaml](/images/go-wrap-and-kubernetes/app.yaml)** in your project folder. Make sure to replace the container image location in this file with the tag you just pushed.

Deploy this file to Kubernetes and wait for an external cluster IP to be assigned.

```sh
kubectl apply -f app.yaml
kubectl get service go-wrap-kubernetes
```

Once you have your IP press Ctrl-C.

## Test it

Enter the IP in your browser. You should get three books in JSON format.

Add a /author?author=alex behind the IP. You should now just get the `Mastering MongoDB 4.x` book.

## Done!

🎉🎉🎉!

Hopefully everything works! You can play around with the program, add some more features or change how something works. To redeploy something after you changed, bump the version number for the image in app.yaml and then run these commands with the new version number:

```sh
docker build -t gcr.io/blog-kube-test/go-wrap-kubernetes:\[VERSION_NUMBER\] .
docker push gcr.io/blog-kube-test/go-wrap-kubernetes:\[VERSION_NUMBER\]
kubectl apply -f app.yaml
kubectl rollout status deployment/go-wrap-kubernetes
```

Anything not working? Make sure to message me at @lcasdev on Twitter or open an issue on **[this repository](https://github.com/lucacasonato/go-wrap-kubernetes)**.
