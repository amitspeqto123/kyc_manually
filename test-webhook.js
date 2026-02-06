import axios from 'axios';

const testWebhook = async () => {
  try {
    console.log('Making request to webhook...');
    const response = await axios.post('http://localhost:8080/v1/kyc/webhook/persona', {
      data: {
        id: 'inq_test123',
        attributes: {
          status: 'completed',
          'decisioned-at': '2024-01-01T00:00:00Z'
        }
      },
      id: 'evt_test123'
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 5000
    });

    console.log('Response status:', response.status);
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error making request:', error.message);
    if (error.code) console.error('Error code:', error.code);
    if (error.response) {
      console.log('Response status:', error.response.status);
      console.log('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received');
    }
  }
};

testWebhook();