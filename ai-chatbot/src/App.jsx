import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
  import { useForm } from "react-hook-form";
import { useState } from 'react';
import OpenAI from "openai";
import { apiKey } from './config';


function App() {

const [message, setMessage] = useState('') 

const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
        console.log(apiKey);

    const openai = new OpenAI({
      apiKey: apiKey ,
      dangerouslyAllowBrowser: true,
    });

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: data.question,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });


    console.log(response)
    setMessage(response)
  }


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
      <p>{message}</p>
    </Container>
  );
}

export default App
