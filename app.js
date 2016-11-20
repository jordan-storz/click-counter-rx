$('document').ready(() => {
  let $button = $('button');
  let clickStream = new Rx.Subject();
  let numberStream = clickStream.map(click => 1);
  let counterStream = numberStream.scan((acc, number) => {
    return acc + number;
  }, 0);
  $button.click((event) => {
    clickStream.onNext('click');
  });

  clickStream.subscribe(
    val => insertToStream($('.click'), val)
  );

  numberStream.subscribe(
    val => insertToStream($('.number'), val)
  );

  counterStream.subscribe(
    val => insertToStream($('.count'), val)
  );

  function insertToStream($col, val) {
    createBtn($col, val);
  }

  function createBtn($col, val) {
    let $el = $(`
      <article>
        <button class="btn-floating btn-small">
          ${val}
        </button>
      </article>`
    );
    $col.append($el);
  }
});
