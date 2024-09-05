# convo-gpt
Small personal project to try out being an API engineer and use OpenAI's available models.

As a language learner myself I sometimes find it hard to practice my reading and speaking skills due to the fact I just don't know what to practice on. I really love learning through reading everyday scenario dialogues that you find on learing books but sadly there's only so many that you can read. 

So Convo-GPT is born!
Now you don't need to worry about thinking and creatig your own dialogue to practice languages. Using OpenAI's GPT-4o-mini model, I have created a simple website that can generate conversation script for you to practice on. You can even enter your own dialogue theme and the model will generate it accordingly. Now available in English, Japanese, Spanish, German, and France!

Currently still only available on local (mainly because no money to pay API(I'm afraid you guys will ddos me)). 

## How to install

1. Clone repository
  ```
  git clone https://github.com/sultanfsn/convo-gpt.git
  ```
2. Install requrements
   ```
   pip install openai
   ```
   ```
   npm install
   ```
3. Add your own OpenAI API key
   ```
   export OPENAI_API_KEY="your_api_key_here"
   ```
4. Run backend service
   ```
   python main.py
   ```
5. Run frontend service
   ```
   npm run dev
   ```  
