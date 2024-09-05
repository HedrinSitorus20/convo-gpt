from openai import OpenAI
client = OpenAI()


def api_call_dialogue(input=None):
    language = input["language"]
    num_person = input["num_person"]
    theme = input["theme"]

    content = f"Generate a conversation script in {language} featuring {num_person} characters. The dialogue should revolve around the theme of {theme}. Ensure that the characters' interactions are engaging, contextually appropriate, and consistent with the selected theme. The dialogue should capture the nuances of the chosen language, reflect the personalities of the characters, and include natural transitions between topics related to the theme. The dialogue it self should not be too long, keep it to 5 dialogue per character. Additionally, make sure the conversation flows smoothly and serves the intended purpose of the script!"

    completion = client.chat.completions.create(
    model="gpt-4o-mini",
    seed=42,
    temperature=0.5,
    messages=[
        {"role": "system", "content": "You are a conversational AI assistant specialized in generating engaging and contextually appropriate dialogue scripts for various scenarios, including customer service, entertainment, educational tutoring, and casual conversations. Your role is to create realistic and coherent dialogues between two or more characters, ensuring that each character's voice, tone, and personality are distinct and consistent throughout the conversation. The dialogues should be contextually relevant, naturally flowing, and capable of driving the intended narrative or purpose of the script. Additionally, you should handle transitions between topics smoothly, manage conversational dynamics effectively, and incorporate any specific instructions provided for character traits, plot points, or conversational goals."},
        {"role": "user", "content": content}
    ]
    )

    return completion.choices[0].message.content

def user_input():
    inputs = {
        "language": "",
        "num_person": 0,
        "theme": ""
    }

    for key in inputs:
        print(key, "?")
        value = input()
        inputs[key] = value
        print()
    
    return inputs

def main():
    inputs = user_input()
    print()
    print(api_call_dialogue(inputs))

if __name__=="__main__": 
    main() 