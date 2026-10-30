# Support ticket desk: a dot with a screen

A support line that registers a ticket while it talks. Each time you give a detail, the agent calls
its `register_ticket` tool (`tools/index.ts`), and the tool's screen (`screens/show_ticket.html`)
shows the ticket on your display: "Saving…" while it runs, then its number. You can correct it
there and the agent uses your correction.

## Try it

Open the console link `polka deploy` prints (or Projects → this project → Talk to it),
press **Start conversation**, wear headphones, and say each line, pausing after it:

| You say | What you should see |
|---|---|
| "Hi, my order arrived broken." | The agent asks your name (sometimes the ticket already opens with the issue) |
| "My name is Priya Shah." | **The ticket appears** ("Saving…", then its number), with your name |
| "The order number is four four one seven." | Order number 4417 is added |
| "It's a lamp, and it came cracked." | The issue is added |
| *On the screen:* change the order number to 4471, press **Correct it** | The agent answers your correction |
| "That's all, thanks. Goodbye." | It says goodbye and the call ends |

The screen shows whenever the model calls the tool; a correction from the screen is sometimes
argued with instead of taken on the default model (Llama 3.1 8B).
`model: "@cf/meta/llama-3.3-70b-instruct-fp8-fast"` takes corrections more often, about a second
slower per turn.

## How a screen works

A tool names its screen (`screen: "show_ticket"`): any `screens/*.html`, its file name its name.
It is shown as soon as the tool is called, with the tool's arguments, then updated with what the
tool returned as `show` (or an error). In the page, `data-field="x"` shows value `x`,
`data-when="running"` / `"done"` / `"error"` shows an element only then, and a `<form>` sent goes
back to the agent as your turn. The model never shows a screen itself.

## On your own site

```html
<script src="https://voice-agent-platform.stagezerotech.workers.dev/widget.js" async></script>
<voice-agent session-url="/api/voice-session" label="Talk to support"></voice-agent>
```

`/api/voice-session` is yours: it starts the conversation with your key
(`POST /v1/conversations { "agent": "<this project's id>" }`) and returns what it got back.
