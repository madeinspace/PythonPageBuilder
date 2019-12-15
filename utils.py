def camelCaseMe(str):
  frag = str.split("-")
  return ''.join(map((lambda x: x.capitalize()), frag))
