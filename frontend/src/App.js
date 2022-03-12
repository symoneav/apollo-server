import "./styles.css";
import { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

const SlugCreate = () => {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");

  const CREATE_SLUG = gql`
    mutation createLink($url: String!, $slug: String!) {
      createLink(url: $url, slug: $slug) {
        url
        slug
      }
    }
  `;

  const [createLink,{ data, loading, error }] = useMutation(CREATE_SLUG);
  console.log(data)

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
  return (
    <form
    onSubmit={e => {
      e.preventDefault();
      createLink({ variables: { url: url , slug:slug} });
      setUrl("")
      setSlug("")
    }}>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      <input
        type="text"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />
      <label>slug must be at least 4 characters</label>
      <button type="submit">Shorten Link</button>
    </form>
  );
};

export default function App() {
  const [links, setLinks] = useState([]);

  const GET_USERS = gql`
    query GetUsers {
      users {
        firstName
        lastName
      }
    }
  `;

  const GET_LINKS = gql`
    query GetLinks {
      links {
        url
        slug
      }
    }
  `;

  // const client = ...

  const { loading, error, data } = useQuery(GET_LINKS);

  useEffect(() => {
    if (data) {
      console.log(data);
      // setLinks(data.users);
    }
  }, [data]);

  return (
    <div className="App container">
      <nav class="navbar navbar-expand-lg  ">
        <div class="container-fluid" style={{ color: "black" }}>
          <a class="navbar-brand" href="#">
            <img
              src="https://hdwy.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fd0c0ab6a-6f1a-4fdb-b38b-7223aa096fa5%2Flogo.png?table=block&id=1b004435-6c35-4867-8c1d-0ef846c623a4&spaceId=425f0f1f-eb89-41cf-b925-85e46de334af&width=200&userId=&cache=v2"
              alt="logo"
            />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse " id="navbarNav">
            <ul class="navbar-nav midsection">
              <div className="navbar-nav midsection">
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Features
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Domain
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Pricing
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Enterprise
                  </a>
                </li>
              </div>

              <div class="navbar-nav nav-right">
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Login
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Sign Up
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <button className="nav-btn" type="button">
                      Get a quote
                    </button>
                  </a>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
      <h1>Hello CodeSandbox</h1>
      <div>
        <SlugCreate />
        <ul>
          {/* {links.length > 0 &&
            links.map((link) => <li key={link.firstName}>{link.firstName}</li>)} */}
        </ul>
      </div>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
