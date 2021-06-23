import Head from "next/head";
import axios from "axios";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Results from "../components/Results";
import request from "../utils/request";

export default function Home({ results }) {
    return (
        <div>
            <Head>
                <title>Hulu 2.0</title>
                <meta
                    name="description"
                    content="Watch the latest movies and tv shows"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Header */}
            <Header />

            {/* Nav */}
            <Nav />

            {/* Results */}
            <Results results={results} />
        </div>
    );
}

export async function getServerSideProps(context) {
    const genre = context.query.genre;
    const movies = await axios.get(
        `https://api.themoviedb.org/3${
            request[genre]?.url || request.fetchTrending.url
        }`
    );
    
    return {
        props: {
            results: movies.data.results
        }
    }
}
