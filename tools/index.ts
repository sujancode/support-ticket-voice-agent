import { defineTools } from "@voice-agent/sdk";

// The ticket, registered as the call goes. Its screen (screens/show_ticket.html) is on the caller's
// display from the moment it is called, and shows the ticket's number when it is done.
export default defineTools({
  register_ticket: {
    description:
      "Register or update the support ticket. Call it every time you learn or change the caller's name, order number or issue, with everything you know so far.",
    args: { name: "The caller's name.", order: "Their order number.", issue: "What went wrong, in a few words." },
    screen: "show_ticket",
    async run({ name, order, issue }, { conversation }) {
      // Put it in your helpdesk here (a fetch to its API, with a key from env).
      const ticket = `T-${conversation.id.slice(-6).toUpperCase()}`;
      const missing = [!name && "name", !order && "order number", !issue && "issue"].filter(Boolean);
      return {
        result: missing.length ? `Ticket ${ticket} updated; still missing: ${missing.join(", ")}.` : `Ticket ${ticket} is registered with everything.`,
        show: { ticket, status: missing.length ? "In progress" : "Registered" },
      };
    },
  },
});
