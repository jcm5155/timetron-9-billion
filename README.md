# TT9B
http://tt9b.herokuapp.com/
 ### Make timed “splits” for your life.
  Create custom countdown timer “segments” that can be chained together into "routines” which allow for the precise tracking of larger lengths of time. 
  Run a time routine in the background and let it keep you on track while you study, practice your musical instrument, run your next meeting etc.
  
  ##### Run your routine!
  ![Run your routine](https://media.giphy.com/media/iDUZ7jl65r1ojyaH7P/giphy.gif)

   ##### Edit your routine!
  ![Edit your routine](https://media.giphy.com/media/hSLn5FPLsQwT2lywjV/giphy.gif)
 
  ##### A normal stopwatch!
  ![Run the stopwatch](https://media.giphy.com/media/gi9hso4A5uxf1vOlKY/giphy.gif)
  
  Requirements.
  ----
  * Python 3.7
  * npm
  
  Installation.
  ----
  From the root of the repository:
  1. `pipenv install` - Installs dependencies listed in `Pipfile`.
  2. `pipenv shell` - Starts the virtual environment shell.
  3. `npm install` - Installs dependencies listed in `package.json`.
  4. `npm run dev` - Builds `main.js` via webpack.*
  5. `cd tt9b` - Navigate to the directory that contains `manage.py`.
  5. `python manage.py migrate` - Applies migrations for the database.
  6. `python manage.py runserver` - Starts the development server (default port is `8000`).
  
   \* (NOTE: Older versions of Node will sometimes produce `Error: Package exports for '{filepath}' do not define a '.' subpath`. Please update Node to resolve this error.)
  
  
  The tech.
  ----
  #### React+Redux
  Key dependencies include thunk, momentjs, react-beautiful-dnd, react-bootstrap
  #### Django
  Key dependencies include rest_framework, knox
  
  ----
  
###### This is my final project for my time in LaunchCode's Immersive CodeCamp (Oct. 2019 - Jan 2020). The curriculum for this course covered Python(+Flask), MySQL, and C#(+.NET Core). I started learning Javascript, React+Redux, and Django on my own time over the course of ~1-2 weeks in late January 2020 (and loved every minute of it).
