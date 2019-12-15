def camelCaseMe(str):
  frag = str.split("-")
  capitalised = ''.join(map((lambda x: x.capitalize()), frag))
  return capitalised
