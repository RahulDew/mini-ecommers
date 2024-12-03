
# Mini E-Commerce

This mini e-commerce web app allows users to view products with details like name, price, and description, and manage orders, offering a streamlined experience for both customers and administrators.




## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB


## Run Locally

Clone the project

```bash
  git clone https://github.com/RahulDew/mini-ecommers.git
```

Go to the project directory

```bash
  cd mini-ecommers
```

Install dependencies

```bash
  cd server
  npm install

  cd client
  npm install
```

Start the server

```bash
  cd server
  npm run dev

  cd client
  npm run dev
```



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

For Server(backend)

`MONGODB_URL=`

`CLIENT_URL=`

`JWT_SECRET=`

`PORT=`

For Client (frontend)

`VITE_API_BASE_URL=`




## Features

- Role based Authentication
- Admin Dashboard Management
- Product Management & Overview
- Ordering system
- Responsiveness
- UI/UX design



## Lessons Learned

- The challenge was to allow authentication with roles cause Admin is also a customer and customer can't be a Admin. So providing access was bit challenging for me.

- An E-Commerse Web Application has multiple features but analyzing wich would be needed is more important.

- Managing the UI with responsiveness like table and complex user interaction is complex but it help to understand.

- MongoDB concepts helped me to solve complex problems effectively



## Screenshots

### For Customers 
![image](https://github.com/user-attachments/assets/75c9e2b8-89f9-407b-bdb3-99f4a97a7b86)

![image](https://github.com/user-attachments/assets/3262c961-9e1c-496d-adb5-a11b56a72598)

![image](https://github.com/user-attachments/assets/9ec8ba62-9c8e-4ce7-ae37-8c71212cb693)

![image](https://github.com/user-attachments/assets/a1a64b22-977a-451c-bf6f-20123a6f9a97)


### For Admin

![image](https://github.com/user-attachments/assets/a4b7c0d4-ed86-4f63-b1e7-bedb0d4f742d)

![image](https://github.com/user-attachments/assets/9b166b1e-3229-4ccc-8458-5e205ea36f0e)

![image](https://github.com/user-attachments/assets/0da3b5d2-a107-4437-9a8a-eca719e6c691)



## Need Help

- I'm facing problems in deploying the app in production 

