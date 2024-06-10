import React from "react";
import {Form, Input, Typography} from "antd";
const { Text } = Typography;


interface IWoodInput {
    InputField: {
        name?		: string,
        label?		: string,
        placeholder?: string,
        rules?		: any,
        id?			: string,
        type?		: string,
        disabled?	: boolean,
        onChange?: (value: any) => void;
    }
}

export const WoodInput:React.FC<IWoodInput> = ({ InputField }) => {
    const {
        name,
        label= 'Input Label',
        placeholder = 'Placeholder',
        rules = [],
        id = 'in-text',
        type = 'text',
        disabled = false,
    } = InputField;

    return (
        <div className={"relative"}>
            <Form.Item name={name} rules={rules} className={""}>
                <Input id={id}
                       type={type}
                       size={"middle"}
                       disabled={disabled}
                       placeholder={placeholder}
                       className="peer p-4 block w-full border-gray-200 rounded-lg text-sm
                        focus:border-blue-500
                        focus:ring-blue-500
                        disabled:opacity-50
                        disabled:pointer-events-none
                        pt-6
                        pb-2
                        [&:not(:placeholder-shown)]:pt-6
                        [&:not(:placeholder-shown)]:pb-2
                        autofill:pt-6
                        autofill:pb-2"/>
            </Form.Item>
            <Text className="absolute top-0 start-0 p-4 h-full text-sm truncate font-semibold
                    pointer-events-none transition ease-in-out duration-100
                    border border-transparent origin-[0_0]
                    peer-disabled:opacity-50
                    peer-disabled:pointer-events-none
                    scale-90
                    translate-x-0.5
                    -translate-y-2.5
                    peer-focus:text-gray-500">
                {label}
            </Text>
        </div>
    );
};
