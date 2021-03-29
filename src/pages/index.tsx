import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import Header from '../components/Header';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  // TODO
  const { results, next_page } = postsPagination;
  const [posts, setPosts] = useState<Post[]>(results);
  const [moreContent, setMoreContent] = useState<string | null>(next_page);

  function handleLoadMorePosts() {
    fetch(next_page)
      .then(response => response.json())
      .then(post => {
        const newPosts = post.results.map(
          (p: Post) =>
            p && {
              uid: p.uid,
              first_publication_date: p.first_publication_date,
              data: {
                title: p.data.title,
                subtitle: p.data.subtitle,
                author: p.data.author,
              },
            }
        );

        const morePosts = [...posts, ...newPosts];

        setPosts(morePosts);
        setMoreContent(post.next_page);
      });
  }

  return (
    <>
      <Head>
        <title>Desafio criando projeto do zero</title>
      </Head>

      <Header />

      <main className={commonStyles.container}>
        {posts.map(result => (
          <div className={styles.post} key={result.uid}>
            <Link href={`post/${result.uid}`}>
              <a>
                <strong>{result.data.title}</strong>
                <p>{result.data.subtitle}</p>
              </a>
            </Link>
            <div className={styles.author}>
              <FiCalendar />
              <time>
                {format(
                  new Date(result.first_publication_date),
                  'dd MMM yyyy',
                  {
                    locale: ptBR,
                  }
                )}
              </time>
              <FiUser /> <span>{result.data.author}</span>
            </div>
          </div>
        ))}

        {moreContent && (
          <button
            onClick={handleLoadMorePosts}
            type="button"
            className={styles.moreContent}
          >
            Carregar mais posts
          </button>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 2,
    }
  );

  //   // TODO
  const results = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  return {
    props: {
      postsPagination: {
        results,
        next_page: postsResponse.next_page,
      },
    },
  };
};
