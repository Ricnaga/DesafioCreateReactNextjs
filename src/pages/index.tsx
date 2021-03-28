import { GetStaticProps } from 'next';
import { FiCalendar, FiUser } from 'react-icons/fi';
import Head from 'next/head';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

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

export default function Home() {
  // TODO
  return (
    <>
      <Head>
        <title>Desafio criando projeto do zero</title>
      </Head>
      <main className={commonStyles.container}>
        <div className={styles.post}>
          <strong>Como utilizar Hooks</strong>
          <p>Pensando em sincronização em vez de ciclos de vida.</p>

          <div className={styles.author}>
            <FiCalendar /> <time>15 Mar 2021</time>
            <FiUser /> <span>Josesph Oliveira</span>
          </div>
        </div>

        <div className={styles.post}>
          <strong>Criando um app CRA do zero</strong>
          <p>
            Tudo sobre como criar a sua primeira aplicação utilizando Create
            React App
          </p>
          <div className={styles.author}>
            <FiCalendar /> <time>15 Mar 2021</time>
            <FiUser /> <span>Josesph Oliveira</span>
          </div>
        </div>

        <div className={styles.post}>
          <strong>Como utilizar Hooks</strong>
          <p>Pensando em sincronização em vez de ciclos de vida.</p>

          <div className={styles.author}>
            <FiCalendar /> <time>15 Mar 2021</time>
            <FiUser /> <span>Josesph Oliveira</span>
          </div>
        </div>

        <div className={styles.post}>
          <strong>Criando um app CRA do zero</strong>
          <p>
            Tudo sobre como criar a sua primeira aplicação utilizando Create
            React App
          </p>
          <div className={styles.author}>
            <FiCalendar /> <time>15 Mar 2021</time>
            <FiUser /> <span>Josesph Oliveira</span>
          </div>
        </div>

        <a className={styles.moreContent}>Carregar mais posts</a>
      </main>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
