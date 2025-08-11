In angular v19,

lets create a full feature as listed below.

On the main page there is button "Stepper form", upon clicking on this button a new page is opened which has its own dedicated route lets call it "/stepper".


In the /stepper screen, there will be a header which contains title, subtitle, and cancel and submit button(submit button will be disabled until all the fields are filled). There are 2 sides -> on the left side there will be a question with 4 options which checkboxes and multiple can be selected (Question: Application Type; options: Web, Mobile, Desktop, Wireframe), at the bottom there will be prev and next button. On the other side, there will be section called summary which will show that all is selected on the form step after step.

Prev button is disabled as this is the first page and next button is enabled only when one checkbox is selected.

For example:
Based on user's selection lets say they selected Web and Mobile, ideally there could be 2 web apps to 10 web apps coming from the backend and same for mobile, the following steps will multiple based on the web apps.

Example of data and expected stepper structure:
Data returns 3 web apps(Web 1, Web 2, Web 3) and 2 mobile apps(mobile 1, mobile 2) and user have selected web and mobile.

Next step will be for Web 1 form field, which will have a form with 3 fields (Name, Description, URL) and a next button. The summary section will show the selected options and the data entered in the form.

Next step will be again for Web 1 form field, which will have a form with 1 more field (one question with 3 checkboxes(workforce, client, customer) based on the selection next stepper step will be added with relavent question). The summary section will show the selected options and the data entered in the form.

If workforce and customer are selected, next step will display form with 2 question for workforce. Upon selected that will be shown on the summary block.

Next step will be same question but for customers as it was selected. Upon selected that will be shown on the summary block.

When clicked on the next button, Web 2 form filed will be dispayed very similar to Web 1. Will behave the same way as Web 1. Once selected then the next button is enabled. By default prev and next are disabled.

Same steps for Web 3, Mobile 1 and Mobile 2.

Lastly, a review page where user could see all the selected data separated as Web 1, Web 2, Web 3, Mob 1, and Mob 2 O (Each app will have an edit link and when clicked on it should redirect to that stepper for that web application step) and the submit button enables. Data should be shows on success page on the console.

Some featues and things to keep in mind:
1. form state between all the pages/components
2. as in some cases stepper step is added dynamically create best practice component structure for solving this kind of solution
3. add dynamic steps in between
4. each step should have a route so we can jump to that page when on review and want to edit.
5. How to manage frontend stepper state
6. Keep track of all the form fields which will be passed to backend on submit
7. Make it in a way that in future if one field need to be added or removed its easier.
8. Suggest best practice for resuing some of the components where required
Our tech stack: Angular version v19, rxjs, reactive forms.



We want to design components in Angular in such a way that it is very optimized and best solution.