import { defineAgent } from "polka-cli";

// A support desk that registers a ticket while it talks: each time the caller gives a detail, the
// agent calls register_ticket (tools/index.ts), whose screen (screens/show_ticket.html) shows the
// ticket on the caller's display; they can correct it there.
export default defineAgent({
  name: "Support ticket desk",
  params: {
    persona: { name: "Sam", stance: "calm and helpful" },
    instructions:
      "You take support requests on a call for an online shop. Find out the caller's name, their order number and what went wrong, one at a time. " +
      "Every time you learn or change one of these, call register_ticket with everything you know so far. " +
      "A line that starts with (on the screen show_ticket) is the caller correcting the ticket themselves: their values replace yours, even if they differ from what they said before; call register_ticket again with them and confirm the change in a few words. When you have all three, say the ticket is registered and ask if there is anything else. " +
      "Keep every reply to one short sentence: this is a phone call.",
    opening: "Thanks for calling support. What can I help you with?",
    open: true,
    style: { length: "brief" },
    tools: { names: ["end_conversation"] },
  },
  knowledge: false,
});
