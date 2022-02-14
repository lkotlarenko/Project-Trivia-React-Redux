const url = 'https://opentdb.com/api_token.php?command=request';

const fetchTokenApi = async () => {
  try {
    const response = await fetch(url);
    const JSON = await response.json();
    return JSON;
  } catch (error) {
    console.log(error);
  }
};

export default fetchTokenApi;
