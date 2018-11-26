# Mapping the unjust city


## Setting up for local development

Start with cloning the repository from GitHub.
```bash
git clone git@github.com:vojd/mapping-the-unjust-city.git
```

### Build the backend

```commandline
cd backend
mkvirtualenv -p /path/to/python3 mapping-the-unjust-city
pip install -r requirements.txt

## Create the local sqlite db

./manage.py migrate

## Create a superuser

./manage.py createsuperuser

## Start the server

./manage.py runserver 0.0.0.0:8080
```

Now you're all set to login to the admin which you find at
[http://localhost:8080/admin](http://localhost:8080/admin)

### Build the frontend

```commandline
cd client
npm i

yarn start
```

### Building

If you get the error ``fetchPackageMetaData error for @types/react@latest 404 Not Found: @types/react@latest``::

```
npm set registry https://registry.npmjs.org/
```
# mapping-the-unjust-city


```

{
  'fruangen': {}
}

{
  // [id, type]
  nodes: [['fruangen', 4], ['vastertorp', 0] ['hagerstensasen', 0]],
  siblings: [
    {
      nodes: [0, 0, 4],
      
    }
  ]
}
```
