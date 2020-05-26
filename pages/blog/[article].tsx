import * as React from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { Client } from "../../util/prismic";
import Prismic from "prismic-javascript";
import Link from "next/link";
import markdownToHtml from "../../util/markdown";
import markdownStyles from "./markdown.module.css";
import { useRouter } from "next/dist/client/router";

interface Props {
  blogPost: {
    id: string;
    title: string;
    publishedAt: string;
    content: string;
    coverImage: { url: string; alt: string };
  };
}

const Home: NextPage<Props> = ({ blogPost }) => {
  const { isFallback } = useRouter();
  return (
    <div className="mx-auto max-w-screen-md px-4 sm:px-6 md:px-8 my-8">
      <div className="mb-8">
        <Link href="/">
          <a className="text-gray-500 hover:text-gray-800 leading-tight hover:underline focus:underline transition duration-150 ease-in-out">
            &larr; Back Home
          </a>
        </Link>
      </div>
      {isFallback ? (
        <h1 className="mt-8 text-gray-900 leading-tight font-semibold text-3xl md:text-4xl">
          Loading...
        </h1>
      ) : (
        <>
          <img
            src={blogPost.coverImage.url}
            alt={blogPost.coverImage.alt}
            className="w-full rounded-md border border-gray-200"
          />
          <h1 className="mt-8 text-gray-900 leading-tight font-semibold text-3xl md:text-4xl">
            {blogPost.title}
          </h1>
          <p className="mt-1 text-lg text-gray-500">{blogPost.publishedAt}</p>
          <div className="mt-8 mb-24 lg:mb:32">
            <div
              className={markdownStyles["markdown"]}
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await Client().query(
    Prismic.Predicates.at("document.type", "blog_post"),
    { orderings: "[my.blog_post.first_publication_date desc]" }
  );

  return {
    paths: posts.results.map((post) => ({
      params: { article: post.uid },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const post = await Client().getByUID(
    "blog_post",
    ctx.params.article as string,
    {
      lang: "en-us",
    }
  );
  return {
    props: {
      blogPost: {
        id: post.uid,
        title: post.data.title,
        publishedAt: new Date(post.first_publication_date).toLocaleDateString(),
        content: await markdownToHtml(post.data.content ?? ""),
        coverImage: {
          url: post.data.cover_image.url,
          alt: post.data.cover_image.alt,
        },
      },
    },
    unstable_revalidate: 3600,
  };
};

export default Home;
