# Assignment 4 - Laundry Services Web App

## Project Overview
This project is a laundry booking website made with HTML, CSS, and JavaScript.
The user can:
- view laundry services
- add and remove items from a cart
- see the total amount
- fill a booking form
- send a booking email
- use the page on mobile with a menu button

## Files
- `index.html` -> page
- `style.css` -> styling and responsive layout
- `script.js` -> cart logic, form validation, and button events
- `api/send-booking.js` -> secure email function for Vercel

## Features
- responsive navigation
- cart add and remove buttons
- total amount update
- booking form with basic checks
- success message after booking
- newsletter section

## How Booking Email Works
The page does **not** keep EmailJS keys in the client-side JavaScript.
Instead, the booking form sends data to a serverless function.
That function sends the email to EmailJS using environment variables.

This is safer than putting the keys directly in `script.js`.

## Vercel Environment Variables
Add these variables in Vercel:

- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`
- `EMAILJS_PRIVATE_KEY`

Vercel docs:
- [Environment variables](https://vercel.com/docs/environment-variables)
- [Deploying to Vercel](https://vercel.com/docs/deployments/deployment-methods)

EmailJS REST API:
- [EmailJS /send API](https://www.emailjs.com/docs/rest-api/send/)

## EmailJS Template Variables
Use these variables in your EmailJS template:

```text
{{customer_name}}
{{customer_email}}
{{customer_phone}}
{{order_summary}}
{{total_amount}}
```

Set the `To Email` field in EmailJS to:

```text
{{customer_email}}
```

## How to Run
1. Open the `Assignment-4` folder in your editor.
2. Make sure the files are:
   - `index.html`
   - `style.css`
   - `script.js`
   - `api/send-booking.js`
3. Open `index.html` in the browser for layout testing.
4. For deployed email sending, deploy the project to Vercel and add the environment variables.

## What I Changed After Feedback
- moved styles into `style.css`
- moved JavaScript into `script.js`
- replaced inline `onclick` with `addEventListener()`
- used simpler JavaScript checks for email and phone
- kept email keys out of the client-side code
- used more semantic HTML sections
- made the project ready for Vercel deployment

## Learning Notes
This project helped me practice:
- responsive layout
- DOM events
- cart update logic
- simple form checking
- using a serverless function for secure email sending


## I live on vercel tools because - netlify asking for credit that's why i used vercel

<!-- Now we can test in real life  -->