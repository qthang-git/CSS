import requests
import urllib.request

url = 'https://www.toptal.com/developers/cssminifier/raw'
css = 'https://raw.githubusercontent.com/Ihnneyu/dark-theme/main/dark-theme.css'
file = urllib.request.urlopen(css)
for line in file:
    decoded_line = line.decode("utf-8")
data = {'input': decoded_line}

response = requests.post(url, data=data)

print(response.text)

f = open("dark-theme.min.css", "w")
f.write(response.text)
f.close()