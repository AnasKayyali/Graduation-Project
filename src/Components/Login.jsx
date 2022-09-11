import {React, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { Col , Row , Container , Input , Label , Form , FormGroup , Button } from 'reactstrap';
import Loader from './Loader';
import Header from './Header';
import './Login.css';


export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showLoader, setShowLoader] = useState(false)
    const navigate = useNavigate();

    const sendInfo = async (event) => {
      
      event.preventDefault();

      const axios = require('axios')
      setShowLoader(true)
      await axios.post(
      'https://i-wanna-learn.herokuapp.com/api/v1/users/login', 
      {email: email, password: password}
      )
      .then(function (response) {localStorage['token']=response.data.data.token; console.log(response.data.data.token)})
      .catch(function (error) {console.log(error)})
      setShowLoader(false)
      navigate ('/');

    }

    return (
      
       <Container>
        <Row>
         <Col lg='12' className='bg-light border'>
          <Header />
         </Col>
        </Row> 
        <Row>
         <Col lg={{offset: 2,size: 8}}>
          <div className='d-flex align-items-center justify-content-center mt-5'>
          <Form onSubmit={sendInfo} className='log'>
           <div className='d-flex align-items-center justify-content-center mb-2 W1'>
            set your information
           </div>
           <div className='d-flex align-items-center justify-content-center mb-4 W2'>
            Join to us
           </div>
           <FormGroup>
             <Label for="exampleEmail">
               Email
             </Label>
             <Input
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               id="exampleEmail"
               name="email"
               placeholder="example@hotmail.com"
               type="email"
               size='lg'
               required
             />
           </FormGroup>
           <FormGroup className='mt-4'>
             <Label for="examplePassword">
               Password
             </Label>
             <Input
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               id="examplePassword"
               name="password"
               placeholder="password"
               type="password"
               size='lg'
               required
             />
           </FormGroup>
           <div className='d-flex align-items-center justify-content-center gap-5'>
            <Button color="primary" className='mt-4'>
              Login 
            </Button>
            {showLoader && <Loader />}
           </div>
          </Form>
          </div>
         </Col>
        </Row>
       </Container> 
       
    );
}