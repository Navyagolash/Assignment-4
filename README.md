# Assignment 4 - Laundry Services Web App

## Project Overview
This project is a laundry booking website made with HTML, CSS, and JavaScript.
The user can:
- view available laundry services
- add and remove services from the cart
- see the total amount
- fill the booking form
- send booking details by email

## Files Used
- `index.html` -> page structure
- `style.css` -> page design and responsive layout
- `script.js` -> cart logic, form handling, and fetch request
- `api/send-booking.js` -> Vercel serverless function for email sending

## Main Features
- responsive navigation
- add and remove cart items
- total amount updates automatically
- booking form with HTML5 validation
- booking email sent through EmailJS

## Form Validation Choice
For the booking form, I used HTML5 validation first:
- `required`
- `type="email"`
- `pattern` for the 10-digit phone number

Then in JavaScript I only check one extra thing:
- whether the cart has at least one item

I used this approach to keep the validation simple.

## Email Setup
This project is deployed on Vercel.
The booking form sends data to `api/send-booking.js`.
That function sends the email by using EmailJS.

The following environment variables are needed in Vercel:
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`
- `EMAILJS_PRIVATE_KEY`

## EmailJS Template Variables
Use these template variables in EmailJS:

```text
{{customer_name}}
{{customer_email}}
{{customer_phone}}
{{order_summary}}
{{total_amount}}
```

Set `To Email` in EmailJS to:

```text
{{customer_email}}
```

## How to Run
1. Open the project folder.
2. Open `index.html` in a browser to check the page layout.
3. For live email sending, deploy the project to Vercel.
4. Add the EmailJS environment variables in Vercel.

## What I Changed After Feedback
- moved JavaScript into `script.js`
- kept the email code in a Vercel API route
- removed the old Netlify files
- changed validation to HTML5 form validation
- added comments to explain layout and JavaScript logic

## What I Learned
This project helped me practice:
- responsive design
- DOM events
- cart updates with JavaScript
- HTML5 form validation
- sending form data to a serverless function

## Note on Help Used
I used documentation and outside guidance while improving the deployment and email setup.
I rewrote the project again after feedback and kept the final version simpler so I can explain it better.
