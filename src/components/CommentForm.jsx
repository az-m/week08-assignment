export default function CommentForm({ nameValue, contentValue }) {
  return (
    <>
      <span>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={nameValue}
          placeholder="required"
          required
          className="bg-form-input rounded-sm ml-2 p-1"
        />
      </span>
      <label htmlFor="content">Your comment:</label>
      <textarea
        name="content"
        id="content"
        rows="4"
        defaultValue={contentValue}
        placeholder="required"
        required
        className="bg-form-input rounded-sm mb-2 p-1"
      />
      <button type="submit" className="border border-sky-500 active:bg-sky-600">
        Submit
      </button>
    </>
  );
}
