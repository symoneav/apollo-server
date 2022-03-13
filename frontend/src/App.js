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

  const [createLink, { data, loading, error }] = useMutation(CREATE_SLUG);
  console.log(data);

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (url.length < 4) {
          alert("slug must be at least 4 characters");
        } else {
          createLink({ variables: { url: url, slug: slug } });
          setUrl("");
          setSlug("");
        }
      }}>
      <div className="form-section">
        <div style={{ display: "flex", flexDirection: "column",}}>
          <label  style={{color:"white"}}>Url</label>
          <input
            className="input-field"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", }}>
          <label style={{color:"white"}}>Slug</label>
          <input
            className="input-field"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>

        <button
          className="url-btn"
          style={{
            height: "3rem",
            width: "auto",
            display: "flex",
            alignItems: "center",
          }}
          type="submit">
          Submit
        </button>
      </div>
      <small  style={{color:"white"}}>*slug must be at least 4 characters</small>
    </form>
  );
};

export default function App() {
  const [links, setLinks] = useState([]);
  const [loaded, setLoaded] = useState(false);

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
      setLoaded(true);
      setLinks(data.links);
    }
  }, [data, links]);

  return (
    <div className="App container-fluid" style={{maxWidth:"100%"}}>
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
            <div className="navbar-nav midsection">
              <a class="nav-link" href="#">
                Features
              </a>

              <a class="nav-link" href="#">
                Domain
              </a>

              <a class="nav-link" href="#">
                Pricing
              </a>

              <a class="nav-link" href="#">
                Enterprise
              </a>
            </div>

            <div class="navbar-nav nav-right">
              <a class="nav-link" href="#">
                Login
              </a>

              <a class="nav-link" href="#">
                Sign Up
              </a>

              <a class="nav-link" href="#">
                <button className="nav-btn" type="button">
                  Get a quote
                </button>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="container hero" style={{display:"flex", flexDirection:"row"}}>
          <div className="banner-content-block "   style={{margin:10}}>
            <div className="banner-text-block">
              <div>
                <h1>
                  Your Brand on <br />
                  Your Links
                  <span class="trademark-text-2 home">®</span>
                </h1>
              </div>
              {/* <div class="trademark-copy home w-hidden-tiny">
                <div class="text-block-v-5 w-hidden-small main-copy-main-main">
                  Your Brand on Your Links{" "}
                  <span class="trademark-text-2 small w-hidden-main">®</span>
                </div>
                <div class="text-block-v-5 w-hidden-small main-copy-main-medium">
                  Your Brand
                  <br />
                  on Your Links{" "}
                  <span class="trademark-text-2 trademark-text-2-medium small">
                    ®
                  </span>
                </div>
                <div class="text-block-v-5 w-hidden-main w-hidden-small">
                  Your Brand
                  <br />
                  on Your Links{" "}
                  <span class="trademark-text-2 trademark-text-2-small small w-hidden-main">
                    ®
                  </span>
                </div>
                <div class="text-block-v-5 w-hidden-main w-hidden-medium">
                  Your Brand
                  <br />
                  on Your Links{" "}
                  <span class="trademark-text-2 trademark-text-2-small-small small w-hidden-main">
                    ®
                  </span>
                </div>
                <div class="trademark-text-2 w-hidden-main-copy-main-medium home w-hidden-medium w-hidden-small w-hidden-tiny">
                  ®
                </div>
              </div> */}
              <p className="p-lg-2 text-dark_hero ">
                Rebrandly is the industry-leading link management platform to
                brand, track and share short URLs using a custom domain name
              </p>
            </div>
            <div style={{display:"flex", flexDirection:"row"}}>
              <button
              style={{margin:"1rem", borderRadius:5}}
                type="button"
                class="Button Button--primary Button--lg Button--block">
                Sign up free
              </button>
              <button
               style={{margin:"1rem", border:"1px solid transparent ", borderRadius:5}}
                type="button"
                class="Button w-hidden-medium w-hidden-small w-hidden-tiny Button--secondary Button--lg Button--block">
                Request a demo
              </button>
            </div>
          </div>
          <div className="hero-container">
            <img
              src="https://hdwy.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F56993b52-55ed-45c4-8db7-d1c6a3f62cbc%2Fperson.png?table=block&id=6c79c066-cbf7-4d1f-9cb5-fa31a2152d08&spaceId=425f0f1f-eb89-41cf-b925-85e46de334af&width=730&userId=&cache=v2"
              slt="hero"
              className="hero-cta"
              style={{margin:10}}
            />
          </div>
        </div>
      </div>
      <div
        className="container-fluid"
        style={{
          backgroundColor: "#263849",
          paddingTop: "40px",
          paddingBottom: "10px",
        }}>
        <div className="container hero">
          <div className="div_form_horizontal_form">
            <div className="rebrand-link-block">
              <div className="w-form">
                <SlugCreate />
                <div className="shortened-links-list">
                  {loaded &&
                    links.length > 0 &&
                    links.map((link, idx) => (
                      <div className="shortened-links-list-item" key={idx}>
                        <div className="origin-link">{link.url}</div>{" "}
                        <div className="short-link">
                          <a href={link.url}>{link.slug}</a>
                        </div>{" "}
                        <div
                          className="copy-link"
                          onClick={() => {
                            navigator.clipboard.writeText(link.url);
                          }}>
                          Copy
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
