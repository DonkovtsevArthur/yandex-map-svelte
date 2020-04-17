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
    transition: background-color 0.15s ease-in-out;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    &:hover {
      background-color: var(--yellow-300);
    }
  }

  .spacer {
    flex: 1;
    height: 100%;
    position: relative;
  }

  .spacer.active {
    &::before,
    &::after {
      position: absolute;
      content: '';
      top: 0;
      bottom: 0;
      background-color: var(--yellow-200);
    }
    &::before {
      left: 0;
      right: -16px;
    }

    &::after {
      right: 0;
      left: -16px;
    }
  }

  .active {
    background-color: var(--yellow-200);
  }

  .quarter-option__number {
    color: var(--black-100);
  }

  .quarter-option__new-count {
    color: var(--black-92);
  }
</style>

<script>
  import { onMount } from 'svelte';
  import {
    valueChanged,
    selectedValue,
    isFirstQuarter,
    isSecondQuarter,
    isThirdQuarter,
    isFourthQuarter
  } from './models/';
  import { quartersNewBuildings } from '../../model/index';
  import { quartersDates, getTimeNow } from '../../utils/quarters-dates';

  onMount(() => {
    const nowTime = getTimeNow();
    const quarterDate = Object.values(quartersDates).find(
      ({ start, end }) => nowTime.start >= start && nowTime.end <= end
    );
    valueChanged(quarterDate);
  });

  const { q1, q2, q3, q4 } = quartersDates;

  const onChangeQuarter = quarterDate => () => {
    valueChanged(quarterDate);
  };
</script>

<div class="quarter-control-root">
  <div
    class="quarter-option"
    class:active="{$isFirstQuarter}"
    on:click="{onChangeQuarter(q1)}"
  >
    <span class="quarter-option__number">1 квартал</span>
    <span class="quarter-option__new-count">+{$quartersNewBuildings.q1}</span>
  </div>
  <div
    class="spacer"
    class:active="{$isFirstQuarter && $isSecondQuarter}"
  ></div>
  <div
    class="quarter-option"
    class:active="{$isSecondQuarter}"
    on:click="{onChangeQuarter(q2)}"
  >
    <span class="quarter-option__number">2 квартал</span>
    <span class="quarter-option__new-count">+{$quartersNewBuildings.q2}</span>
  </div>
  <div
    class="spacer"
    class:active="{$isSecondQuarter && $isThirdQuarter}"
  ></div>
  <div
    class="quarter-option"
    class:active="{$isThirdQuarter}"
    on:click="{onChangeQuarter(q3)}"
  >
    <span class="quarter-option__number">3 квартал</span>
    <span class="quarter-option__new-count">+{$quartersNewBuildings.q3}</span>
  </div>
  <div
    class="spacer"
    class:active="{$isThirdQuarter && $isFourthQuarter}"
  ></div>
  <div
    class="quarter-option"
    class:active="{$isFourthQuarter}"
    on:click="{onChangeQuarter(q4)}"
  >
    <span class="quarter-option__number">4 квартал</span>
    <span class="quarter-option__new-count">+{$quartersNewBuildings.q4}</span>
  </div>
</div>
