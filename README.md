# Interview-Portal

## Basic Requirements

- An interview creation page where the admin can create an interview by selecting participants, start time and end time. Backend should throw error with proper error message if:
  - Any of the participants is not available during the scheduled time (i.e, has another interview scheduled)
  - No of participants is less than 2
- An interviews list page where admin can see all the upcoming interviews.
- Note: No need to add a page to create Users/Participants. Create them directly in the database

### Setup
To start the app
1. `cd backend and npm install`
2. `cd frontend and cd my-app and npm install`
3. `cd .. and cd ..`
4. `npm start`
5. In another terminal `cd frontend && cd my-app and npm start`

### Project will open on port 3000
