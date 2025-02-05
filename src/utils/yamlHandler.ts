import * as fs from 'fs';
import * as yaml from 'js-yaml';

interface Element {
    name: string;
    id: string;
    class: string;
    type?: string;
    aria_label?: string;
    css_selector?: string;
    placeholder?: string;
    value?: string;
    name_attr?: string;
    maxlength?: number;
    minlength?: number;
    required?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    pattern?: string;
    autocomplete?: string;
    autofocus?: boolean;
    tabindex?: number;
    title?: string;
    alt?: string;
    src?: string;
    accept?: string;
    role?: string;
    data_attributes?: Record<string, string>;
}

interface Screen {
    screen_name: string;
    screen_id: string;
    elements: Element[];
}

interface YamlData {
    screens: Screen[];
}

function writeYamlFile(filePath: string, data: YamlData): void {
    try {
        // Convert data to YAML format
        const yamlData = yaml.dump(data, { noRefs: true });

        // Write YAML data to the file
        fs.writeFileSync(filePath, yamlData, 'utf8');

        console.log(`YAML file written successfully to ${filePath}`);
    } catch (error) {
        console.error('Error writing YAML file:', error);
    }
}

// Example usage:
const data: YamlData = {
    screens: [
        {
            screen_name: 'Login Screen',
            screen_id: 'login-screen',
            elements: [
                {
                    name: 'Email field',
                    id: 'email-input',
                    class: 'input-text',
                    type: 'email',
                    aria_label: 'Email Address',
                    css_selector: '#email',
                    placeholder: 'Enter your email address',
                    required: true,
                    maxlength: 255,
                    autocomplete: 'email',
                },
                {
                    name: 'Password field',
                    id: 'password-input',
                    class: 'input-password',
                    type: 'password',
                    aria_label: 'Password',
                    css_selector: '#password',
                    placeholder: 'Enter your password',
                    required: true,
                    maxlength: 128,
                },
                {
                    name: 'Login button',
                    id: 'login-button',
                    class: 'button-primary',
                    type: 'submit',
                    aria_label: 'Login',
                    css_selector: '#login-button',
                },
            ],
        },
        {
            screen_name: 'Registration Screen',
            screen_id: 'registration-screen',
            elements: [
                {
                    name: 'First Name field',
                    id: 'first-name-input',
                    class: 'input-text',
                    type: 'text',
                    aria_label: 'First Name',
                    css_selector: '#first-name',
                    placeholder: 'Enter your first name',
                },
                {
                    name: 'Register button',
                    id: 'register-button',
                    class: 'button-secondary',
                    type: 'submit',
                    aria_label: 'Register',
                    css_selector: '#register-button',
                },
            ],
        },
    ],
};

// Write the data to a YAML file
writeYamlFile('output_screens.yaml', data);