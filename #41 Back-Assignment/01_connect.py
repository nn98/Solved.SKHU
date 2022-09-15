import requests
from bs4 import BeautifulSoup

url = 'https://solved.ac/profile/q9922000/solved'

response = requests.get(url)

if response.status_code == 200:
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')
    title = soup.select_one('#__next > div > div.ProfileLayout__Background-sc-1jvsur0-0.bEAYrk > div > h1')
    print(title)

else : 
    print(response.status_code)