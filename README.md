# Installation Manual
This manual provides a detailed process of building and deploying the source code

### Step - 1 : Set up PostgreSQL DB.
* Install PostgreSQL
```bash
sudo apt install postgresql
```
* Create the database which will used to store the details of Portfolio and Blog Posts.
```bash
sudo -i -u postgres
psql
create database "<Database Name>";
```
### Step - 2 : Install NVM (Node Version Manager) and restart terminal.
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```
### Step - 3 : Install Node.js JavaScript runtime.
```bash
nvm install v18.19.1
```
### Step – 4 : Install PM2.
```bash
sudo npm install -g pm2
```
### Step – 5 : Clone the project repository from GitHub and cd to project folder.
```bash
git clone https://github.com/sbhat893/portfolio-blog-nextjs.git
cd portfolio-blog-nextjs
```
### Step – 6 : Create the environment file “.env”.
```bash
touch .env
```
### Step – 7: Add below environment variables to “.env” file. The auth secret can be generated at https://auth-secret-gen.vercel.app/ 
```bash
DATABASE_URL="postgresql://<Postgres User>:<Password>@<Domain>:5432/<Database Name>"
NEXT_PUBLIC_API_URL=http://<Domain>:<Port>
NEXTAUTH_SECRET=<Next auth secret>
NEXTAUTH_URL=http://<Domain>:<Port>
```
### Step – 8 : Install all the dependencies
```bash
npm install
```
### Step – 8 : Generate the Prisma client
```bash
npx prisma generate 
```
### Step – 9 : Build the website
```bash
npm run build
```
### Step – 10 : Start the website with PM2.
```bash
pm2 start npm -- start
```

# Demo
http://sumukhb.in/