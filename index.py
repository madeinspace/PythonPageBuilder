
import os
import sys
import json

path = "C:\\Users\\fabrice\\Documents\\Workspace\\PythonPageBuilder\\pages"

page_alias = []
with open('pages.json') as jsonfilke:
    data = json.load(jsonfilke)
    for key in data:
      if not data[key]['Draft']:
        print(data[key]['Alias'])
        page_alias.append(data[key]['Alias'])



ts = """
import { sqlConnection } from '../../utils/sql';

import Page from './page';

const fetchData = async ({ filters }) => {
  const tableData = await sqlConnection.raw(tableDataQuery(filters));

  return tableData;
};

const pageContent = {
};

export { fetchData, Page, pageContent };

// uncomment the below function with the correct SQL
const tableDataQuery = filters => {
 
};

"""


tsx = """

"""

page_alias = list(dict.fromkeys(page_alias))
for alias in page_alias:
  print(alias)
  print("{path}\\{alias}".format(path=path, alias=alias))
  os.mkdir("{path}\\{alias}".format(path=path, alias=alias))
  # index.ts
  f = open("{path}\\{alias}\\index.ts".format(path=path, alias=alias), "w+")
  f.write(ts)
  f.close()
  os.mkdir("{path}\\{alias}\\page".format(path=path, alias=alias))
  f = open("{path}\\{alias}\\page\\index.tsx".format(path=path, alias=alias), "w+")
  f.write(tsx)
  f.close()