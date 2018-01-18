import React, { Component } from 'react';
import axios from 'axios';

import Input from '../../globals/forms/Input';
import Button from '../../globals/Button/';
import Logo from '../../globals/Logo';

import './Auth.css';

class AddChallenge extends Component {
  state = { 
    title: '',
    content: '',
    difficulty: null,
    testCase: '',
    testCasesArray: []
   }

  submitChallenge = async (e) => {
    e.preventDefault();
    const { title, content, difficulty, testCasesArray } = this.state;
    const id = localStorage.getItem('id');
    const body = {
      title,
      content,
      difficulty,
      user_id: id,
      type: 0
    }

    const result = await axios.post('http://localhost:3396/api/challenges', body);

    testCasesArray.forEach(async (test) => {
      const payload = {
        content: test,
        challenge_id: result.data.id
        // output_type
      }
      console.log('inside testCase map before await');
      const placeHolder = await axios.post('http://localhost:3396/api/testCases', payload);
      console.log('inside testCase map after await');
    });
    
    this.props.history.push('/home');
  }

  pushToTestCases = (e) => {
    e.preventDefault();
    const { testCase, testCasesArray } = this.state;
    testCasesArray.push(testCase);
    document.getElementsByName('testCase')[0].value = '';
    console.log(testCasesArray);
  }

  handleChallengeInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="login-form-container">
        <Logo
          className="landing-page-logo"
        />
        <form className="auth-form">
          <Input
            name='title'
            type='title'
            placeholder={'enter title'}
            onChange={this.handleChallengeInput}
            />
          <Input
            name='content'
            type='content'
            placeholder={'enter content'}
            onChange={this.handleChallengeInput}
            />
          <Input 
            name='difficulty'
            type='difficulty'
            placeholder={'enter your difficulty'}
            onChange={this.handleChallengeInput}
            />
          <Input 
            name='testCase'
            type='testCase'
            placeholder={'enter test cases'}
            onChange={this.handleChallengeInput}
          />
          <Button 
            backgroundColor="gray"
            color="red"
            text="Add Test Case"
            onClick={this.pushToTestCases}
          />
          <Button
            backgroundColor="red"
            color="white"
            text="Add Challenge"
            onClick={(e) => this.submitChallenge(e)}
            />
        </form>
      </div>
    );
  }
}

export default AddChallenge;
