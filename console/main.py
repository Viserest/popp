# command processing
while True:
  req = input('> ')
  cmd = []
  state = True
  for c in req:
    if c == '\'': state = not state
    elif state and c == ' ': cmd.append('')
    else: cmd[-1] += c
  # Command comprehension
  # ['course','add','English','2nd']
  # []
