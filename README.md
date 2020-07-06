# Form Buddy  🤓

Improved Airtable data quality with stronger validation at record creation.

## What does it do?

Form Buddy gives you an easy to use form view for creating records that provides additional validation to ensure the data you enter is as accurate as possible.

Some examples of what you can do:

### Required

All fields can be made required so you can't add new records without providing all required data.

### Patterns

Some fields including Email, Telephone and URL are pattern matched to ensure you're entering the correct type of data.

### Length

Single and Multiline Text fields can have minimum and maximum length validation.

### Dates

We provide a few options with dates, including ensuring a date has to be before/after another field, today's date, or a fixed date. E.g. for a booking system you'd want the Booking Start date to be after today, and the Booking End date to be after Booking Start.

### Linked Records

Enforce a selection of at least one linked record by making them required.

---

## Development

To run locally:

- Ensure the CLI is installed `npm install -g @airtable/blocks-cli`
- `block run`
- Edit the block via the Base it's installed within (see `./block/remote.json`) to point to the locally running block

When happy with changes:

- `block release` to push it live
- Test it works
- Commit and push the changes to source control