# Node.js Remote Shell Access

This Node.js script provides  secure, remote shell access to your machine via a web browser, utilizing SSH tunneling  and the `ttyd` terminal emulator.

## Features

- **Secure SSH Tunnel:** Establishes a reverse SSH tunnel to `localhost.run`, exposing  a local port securely over the internet.
- **ttyd Integration:** Downloads, installs (if necessary), and runs the `ttyd` terminal emulator,  providing a browser-based terminal interface.
- **Password Protection:** Implements basic password authentication for accessing the shell.
- **Customizable Theme:** Sets a custom theme for the `ttyd` interface.
- **Colab Support :** Optionally embeds the terminal within a Google Colab notebook using an iframe.

## Requirements

- **Node.js:** Ensure you have Node.js installed on your machine.
- **SSH Client:** You need an SSH  client installed and configured (e.g., OpenSSH).
- **localhost.run Account:** An account on [https://localhost.run](https://localhost.run) (free tier available) for SSH tunneling.

## Usage

1. **Clone the Repository:** Clone this repository to your machine.
 2. **Install Dependencies:** Navigate to the project directory and run `npm install`.
3. **Modify Script (Optional):** 
   - Update the `ssh` command in the `shell()` function if you're using a different tunneling service or port.
   - Adjust the `ttyd`  options (e.g., theme, font) as needed.
4. **Run the Script:** Execute the script using `node your-script-name.js`.

## How It Works

1. **SSH Tunnel:** The script establishes a reverse SSH tunnel to your `localhost.run` account, making  a local port (default: 8568) accessible publicly.
2. **ttyd Setup:** It downloads and installs `ttyd` if not found, then starts a `ttyd` server instance on the specified port, serving the `dosh` script.
3. **Password Authentication:**  The `dosh` script prompts for a password and grants shell access only if the entered password matches the randomly generated one.
4. **Browser Access:** You can then access the terminal in your web browser using the provided `localhost.run` URL and password.

## Colab Integration

To use this script  within a Google Colab notebook:

1. Enable the `colab` flag when calling the `shell()` function: `shell(colab = true)`.
2. Ensure you have a library like `jsdom` installed in your Colab environment to provide DOM functionality for the iframe.

## Security  Considerations

- **Strong Password:** Choose a strong and unique password for your `localhost.run` account.
- **Limited Access:** Be mindful of the commands you execute in the remote shell.
- **Close Tunnel:** Terminate the script or close the SSH tunnel when you're finished to prevent unauthorized access .

## Disclaimer

This script is provided for educational and informational purposes only. Use it at your own risk. The authors are not responsible for any misuse or damages caused by this script.
