let messages = [
  { id: 1, user: "Pikachu", text: "Hello World!" },
  { id: 2, user: "Amel", text: "Node.js is fun!" },
  { id: 3, user: "Pikachu", text: "Let's build a live chat!" },
];

const parseBody = (body) => {
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  body = body || {};
  const data =
    body.message && typeof body.message === "object" ? body.message : body;
  const text =
    data.text ?? (typeof data.message === "string" ? data.message : undefined);

  return { user: data.user, text };
};

export const list = (req, res) => {
  const user = req.query.user;

  const filteredMessages = user
    ? messages.filter(
        (message) => message.user.toLowerCase() === user.toLowerCase(),
      )
    : messages;

  res.json({
    status: "success",
    data: { messages: filteredMessages },
  });
};

export const get = (req, res) => {
  const message = messages.find(
    (message) => message.id === Number(req.params.id),
  );

  if (!message) {
    return res.status(404).json({
      status: "fail",
      message: "Message not found",
    });
  }

  res.json({
    status: "success",
    data: { message },
  });
};

export const create = (req, res) => {
  const { user, text } = parseBody(req.body);

  if (!user || !text) {
    return res.status(400).json({
      status: "fail",
      message: "User and text are required",
    });
  }

  const message = {
    id: messages.length ? Math.max(...messages.map((item) => item.id)) + 1 : 1,
    user,
    text,
  };

  messages.push(message);

  res.status(200).json({
    status: "success",
    message: `POSTING a new message for user ${user}`,
    data: { message },
  });
};

export const update = (req, res) => {
  const message = messages.find(
    (message) => message.id === Number(req.params.id),
  );

  if (!message) {
    return res.status(404).json({
      status: "fail",
      message: "Message not found",
    });
  }

  const { user, text } = parseBody(req.body);

  if (user !== undefined) message.user = user;
  if (text !== undefined) message.text = text;

  res.json({
    status: "success",
    message: `UPDATING a message with id ${message.id}`,
    data: { message },
  });
};

export const remove = (req, res) => {
  const index = messages.findIndex(
    (message) => message.id === Number(req.params.id),
  );

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Message not found",
    });
  }

  const deletedMessage = messages[index];
  messages.splice(index, 1);

  res.json({
    status: "success",
    message: `DELETING a message with id ${deletedMessage.id}`,
    data: { message: deletedMessage },
  });
};
