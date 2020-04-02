<style lang="pcss">
  .dates-slider-container {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 10px 5px;
    max-height: 44px;
  }

  .dates-slider {
    width: 100%;
    height: 4px;
    -webkit-appearance: none;
    border-radius: 4px;
    background: var(--black-08);
    outline: none;
    padding: 0;
    margin: 0;
    cursor: pointer;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--yellow-200);
      cursor: pointer;
      transition: box-shadow 0.15s ease-in-out, border-width 0.15s, width 0.15s,
        height 0.15s;
      border-width: 0;
      border-style: solid;
      border-color: var(--white);

      &:active {
        box-shadow: 0px 2px 8px var(--black-16);
        width: 22px;
        height: 22px;
        border-width: 2px;
      }
    }

    &::-moz-range-thumb {
      width: 24px;
      height: 24px;
      border: 0;
      border-radius: 50%;
      background: var(--yellow-200);
      cursor: pointer;
      transition: box-shadow 0.15s ease-in-out, border-width 0.15s, width 0.15s,
        height 0.15s;
      border-width: 0;
      border: solid var(--white);

      &:active {
        box-shadow: 0px 2px 8px var(--black-16);
        width: 22px;
        height: 22px;
        border-width: 2px;
      }
    }
  }
</style>

<script>
  import { minAndMaxDates, selectedValue, valueChanged } from '../../model';
</script>

<label for="dates-range" class="dates-slider-container">
  <input
    class="dates-slider"
    type="range"
    id="dates-range"
    min="{$minAndMaxDates.minDate}"
    max="{$minAndMaxDates.maxDate}"
    value="{$selectedValue}"
    on:change="{valueChanged}"
  />
</label>
