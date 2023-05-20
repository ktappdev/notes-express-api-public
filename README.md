This Api powers (Backend) https://secretnote.netlify.app/ <br>
This is a link to the frontend - https://github.com/KTAppDev/notes-app-frontend-public <br>

missing from the .env file:<br>
AZURE_STORAGE_CONNECTION_STRING="connection string"<br>
DB_URL="mondodb connection string"

<b>Description: Secret Note </b>

Now you can add or replace an image with every note!
Notes and Images stored on "secretnote" can be public or private, depending on the title. Simple titles lead to highly visible notes that can be edited by anyone who stumbles upon them.

Using common words like "hello" as the title is for entertainment purposes only. You will find a variety of messages left by others. If you find something offensive, delete it.
All data is stored in a database with AES-128bit encription and only your title can decrypt it.
