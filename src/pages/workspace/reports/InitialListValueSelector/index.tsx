import type {ForwardedRef} from 'react';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import type {MenuItemBaseProps} from '@components/MenuItem';
import MenuItemWithTopDescription from '@components/MenuItemWithTopDescription';
import useOnyx from '@hooks/useOnyx';
import Navigation from '@libs/Navigation/Navigation';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';

type InitialListValueSelectorProps = Pick<MenuItemBaseProps, 'label' | 'rightLabel' | 'errorText'> & {
    /** Currently selected value */
    value?: string;

    /** Subtitle to display on field */
    subtitle?: string;

    /** Function to call when the user selects a value */
    onInputChange?: (value: string) => void;

    /** The policy ID needed to navigate to the value selector screen */
    policyID: string;

    /** Reference to the outer element */
    ref: ForwardedRef<View>;
};

function InitialListValueSelector({value = '', label = '', rightLabel, subtitle = '', errorText = '', onInputChange, policyID, ref}: InitialListValueSelectorProps) {
    const [formDraft] = useOnyx(ONYXKEYS.FORMS.WORKSPACE_REPORT_FIELDS_FORM_DRAFT);

    useEffect(() => {
        const currentValueIndex = Object.values(formDraft?.listValues ?? {}).findIndex((listValue) => listValue === value);
        const isCurrentValueDisabled = formDraft?.disabledListValues?.[currentValueIndex] ?? true;

        if (isCurrentValueDisabled && value !== '') {
            onInputChange?.('');
        }
    }, [formDraft?.disabledListValues, formDraft?.listValues, onInputChange, value]);

    return (
        <View>
            <MenuItemWithTopDescription
                ref={ref}
                shouldShowRightIcon
                title={value}
                description={label}
                rightLabel={rightLabel}
                brickRoadIndicator={errorText ? CONST.BRICK_ROAD_INDICATOR_STATUS.ERROR : undefined}
                errorText={errorText}
                onPress={() => Navigation.navigate(ROUTES.WORKSPACE_REPORT_FIELDS_CREATE_INITIAL_VALUE.getRoute(policyID))}
            />
        </View>
    );
}

export default InitialListValueSelector;
