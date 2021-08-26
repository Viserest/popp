def command(arg, cmd): return if arg == cmd

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
  
  command = ['school','drone','code']
  command.getIndex(cmd[0])
  
  command = {'school':{'':{},'':{},'':{}},'drone':{},'code':{}}
