import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  // TODO

  return (
    <>
      <Head>
        <title>Desafio criando projeto do zero - posts</title>
      </Head>
      <Header />

      <div className={styles.banner}>
        <img src={post.data.banner.url} alt="banner" />
      </div>

      <main className={commonStyles.container}>
        <div className={styles.title}>
          <h1>{post.data.title}</h1>

          <div className={commonStyles.author}>
            <FiCalendar />
            <time>
              {format(new Date(post.first_publication_date), 'dd MMM yyyy', {
                locale: ptBR,
              })}
            </time>
            <FiUser /> <span>{post.data.author}</span>
            <FiClock /> <span>calcular minutos</span>
          </div>
        </div>

        {post.data.content.map(title => (
          <div key={title.heading} className={styles.content}>
            <h2>{title.heading}</h2>

            {title.body.map(content => (
              <p>{content.text}</p>
            ))}
          </div>
        ))}
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  //   const prismic = getPrismicClient();
  //   const posts = await prismic.query(TODO); //pegar uuid
  //   // TODO
  return {
    paths: [
      //  { params: { slug: '' } }
    ],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  //   // TODO
  return {
    props: {
      post: response,
    },
  };
};
