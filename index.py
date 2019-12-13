
import os
import sys
import json

import subprocess




path = "C:\\Users\\fabrice\\Documents\\Workspace\\PythonPageBuilder\\pages"

page_alias = []

os.system("rmdir /S %s" % path)
os.system("mkdir %s\\pages" % path)  

with open('pages.json') as jsonfilke:
    data = json.load(jsonfilke)
    for key in data:
      if not data[key]['Draft']:
        print(data[key]['Alias'])
        page_alias.append(data[key]['Alias'])

page_alias = list(dict.fromkeys(page_alias))

for alias in page_alias:
  print(alias)
  print("{path}\\{alias}".format(path=path, alias=alias))
  os.mkdir("{path}\\{alias}".format(path=path, alias=alias))
  # api
  with open("./templates/apiTemplate.js", "r") as a:
    api = a.read()

  al = alias.replace('-', '_')

  parameters = {'PageAlias': al.capitalize(),
                'queryName': al
                }

  api = api % parameters
  
  f = open("{path}\\{alias}\\index.ts".format(path=path, alias=alias), "w+")
  f.write(api)
  f.close()
  
  #layout
  l = open("./templates/pageLayoutTemplate.js", "r")
  layout = l.read()
  os.mkdir("{path}\\{alias}\\page".format(path=path, alias=alias))
  f = open("{path}\\{alias}\\page\\index.tsx".format(path=path, alias=alias), "w+")
  f.write(layout % {'PageAlias' : alias.replace('-', '_').capitalize() })
  f.close()
  a.close()