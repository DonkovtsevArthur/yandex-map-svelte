<style>
  .quarter-control-root {
    flex: 1;
    height: 32px;
    z-index: 7;
    background-color: var(--white);
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .quarter-option {
    height: 100%;
    cursor: pointer;
    z-index: 10;
    border-radius: 16px;
    font-size: 14px;
    line-height: 20px;
    padding: 6px 16px;

    &:hover {
      background-color: var(--yellow-300);
    }
  }

  .spacer {
    flex: 1;
    height: 100%;
    position: relative;
  }

  .spacer.active::before {
    position: absolute;
    content: '';
    right: -16px;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: var(--yellow-200);
  }

  .spacer.active::after {
    position: absolute;
    content: '';
    right: 0;
    top: 0;
    bottom: 0;
    left: -16px;
    background-color: var(--yellow-200);
  }

  .active {
    background-color: var(--yellow-200);
  }

  .quarter-option__quarter {
    color: var(--black-100);
  }

  .quarter-option__new-count {
    color: var(--black-92);
  }
</style>

<div class="quarter-control-root">
  <div class="quarter-option active">
    <span class="quarter-option__quarter">1 квартал</span>
    <span class="quarter-option__new-count">+ 406</span>
  </div>
  <div class="spacer active"></div>
  <div class="quarter-option active">
    <span class="quarter-option__quarter">2 квартал</span>
    <span class="quarter-option__new-count">+ 148</span>
  </div>
  <div class="spacer active"></div>
  <div class="quarter-option active">
    <span class="quarter-option__quarter">3 квартал</span>
    <span class="quarter-option__new-count">+ 205</span>
  </div>
  <div class="spacer"></div>
  <div class="quarter-option">
    <span class="quarter-option__quarter">4 квартал</span>
    <span class="quarter-option__new-count">+ 194</span>
  </div>
</div>
