"use client";
import { useState } from "react";

const MailerLiteForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const actionUrl = form.action;
    const formData = new FormData(form);

    try {
      const response = await fetch(actionUrl, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        console.log("Success: Form submitted to MailerLite");
        setFormSubmitted(true);
      } else {
        console.error("MailerLite form submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("MailerLite form submission failed:", error);
    }
  };

  return (
    <div>
      {!formSubmitted ? (
        <form
          className="ml-block-form"
          action="https://assets.mailerlite.com/jsonp/1344816/forms/146887550132291083/subscribe"
          method="POST"
          onSubmit={handleSubmit}
        >
          <input
            aria-label="email"
            aria-required="true"
            type="email"
            className="form-control"
            name="fields[email]"
            placeholder="Email"
            autoComplete="email"
          />
          <button type="submit">Subscribe</button>
        </form>
      ) : (
        <div className="ml-form-successBody">
          <p>Success! Your form has been submitted.</p>
        </div>
      )}
    </div>
  );
};

export default MailerLiteForm;
