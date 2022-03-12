import "./styles.css";
import { useEffect, useState } from "react";
import {
  useQuery,
  gql,
} from "@apollo/client";

export default function App() {
 const [links, setLinks] = useState([])

 
  const GET_USERS = gql`
    query GetUsers {
      users {
        firstName
        lastName
      }
    }
  `;
  // const client = ...
 
 
  const { loading, error, data } = useQuery(GET_USERS);
  useEffect(() => {
  
    if(data){
      console.log(data)
      setLinks(data.users)
    }
  }, [data]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div>
        <input type="text" />
        <ul>
          {links.length > 0 && links.map((link)=><li>{link.firstName}</li>)}
        </ul>
      </div>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
