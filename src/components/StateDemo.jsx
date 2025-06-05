import React from 'react';
import { useUppercaseState } from '../hooks/state/useUppercaseState';
import { useLowercaseState } from '../hooks/state/useLowercaseState';
import { useTitlecaseState } from '../hooks/state/useTitlecaseState';
import { useToggleState } from '../hooks/state/useToggleState';

const StateDemo = () => {
    const { value: uppercaseValue, setValue: setUppercaseValue, reset: resetUppercase } = useUppercaseState('');
    const { value: lowercaseValue, setValue: setLowercaseValue, reset: resetLowercase } = useLowercaseState('');
    const { value: titleCaseValue, setValue: setTitlecaseValue, reset: resetTitlecase } = useTitlecaseState('');
    const { value: toggleValue, setValue: setToggleValue, reset: resetToggle } = useToggleState(false);

    return (
        <div>
            <h2>Factory Pattern Demo - State Transformers</h2>

            <section>
                <h3>Uppercase State</h3>
                <input
                    type="text"
                    onChange={(e) => setUppercaseValue(e.target.value)}
                />
                <p>Value: {uppercaseValue}</p>
                <button onClick={resetUppercase}>Reset</button>
            </section>

            <section>
                <h3>Lowercase State</h3>
                <input
                    type="text"
                    onChange={(e) => setLowercaseValue(e.target.value)}
                />
                <p>Value: {lowercaseValue}</p>
                <button onClick={resetLowercase}>Reset</button>
            </section>

            <section>
                <h3>Title Case State</h3>
                <input
                    type="text"
                    onChange={(e) => setTitlecaseValue(e.target.value)}
                />
                <p>Value: {titleCaseValue}</p>
                <button onClick={resetTitlecase}>Reset</button>
            </section>

            <section>
                <h3>Toggle State (Boolean)</h3>
                <p>Value: {toggleValue ? 'True' : 'False'}</p>
                <button onClick={() => setToggleValue(toggleValue)}>Toggle</button>
                <button onClick={resetToggle}>Reset</button>
            </section>
        </div>
    );
};

export default StateDemo;