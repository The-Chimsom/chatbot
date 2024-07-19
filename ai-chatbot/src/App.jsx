import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
  import { useForm } from "react-hook-form";
import { useState } from 'react';
import axios from 'axios'
import { apiKey } from './config';


function App() {

const [message, setMessage] = useState('') 

const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
         const response = await axios
           .post("https://db8s1l.buildship.run/talk-to-sheets", data.question, {
             headers: {
               "Content-Type": "text/plain", // Set the content type to text/plain
             },
           })
           .then((response) => {
             console.log(response.data); // Handle the response data
           })
           .catch((error) => {
             console.error(
               "There was a problem with the axios request:",
               error
             );
           });


    console.log(response)  }


  return (
    <Container className="mt-3">
      <h3 className="mt-3">Hi! I'm Adora your AI assistant</h3>
      <p className="mb-3">got a question for me?</p>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Control
          type="text"
          {...register("question")}
        />
        <Button variant="info" type="submit" className="mt-3">
          submit
        </Button>
      </Form>
      <p></p>
    </Container>
  );
}

export default App
