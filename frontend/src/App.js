import "./styles.css";
import { useEffect } from "react";
import {
  useQuery,
  gql,
} from "@apollo/client";

export default function App() {
 


 
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
  console.log(data);

  useEffect(() => {
   
  }, [data]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
