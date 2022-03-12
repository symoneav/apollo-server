import "./styles.css";
import { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

const SlugCreate = () => {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");

  const CREATE_SLUG = gql`
  mutation{
    createLink(
      url: "www.merp.page"
      slug: ""
    )
    {
      url
      slug
  
    }
  }
  `;

  const [createLink] = useMutation(CREATE_SLUG);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault;
        createLink();
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

 const  GET_LINKS = gql`
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
    <div className="App">
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
