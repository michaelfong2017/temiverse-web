import React, { useReducer } from "react"
import Head from "next/head"
import DropZone from "../../components/DropZone"
import styles from "../../styles/Upload.module.css"
import { Dropdown } from "@nextui-org/react"

export default function Upload() {
  // reducer function to handle state changes
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone }
      case "ADD_FILE_TO_LIST":
        return { ...state, fileList: state.fileList.concat(action.files) }
      default:
        return state
    }
  }

  // destructuring state and dispatch, initializing fileList to empty array
  const [data, dispatch] = useReducer(reducer, {
    inDropZone: false,
    fileList: [],
  })

  /** Booth dropdown */
  const [selected, setSelected] = React.useState(new Set(["1"]))

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  )
  /** Booth dropdown END */

  return (
    <div className={styles.container}>
      <Head>
        <title>Drag And Drop File Upload</title>
        <meta name="description" content="Nextjs drag and drop file upload" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Drag And Drop File Upload</h1>

        <h3>Select booth:</h3>
        <Dropdown>
          <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
            {selectedValue}
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="Single selection actions"
            color="secondary"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selected}
            onSelectionChange={setSelected}
          >
            <Dropdown.Item key="1">1</Dropdown.Item>
            <Dropdown.Item key="2">2</Dropdown.Item>
            <Dropdown.Item key="3">3</Dropdown.Item>
            <Dropdown.Item key="4">4</Dropdown.Item>
            <Dropdown.Item key="5">5</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <br />
        {/* Pass state data and dispatch to the DropZone component */}
        <DropZone data={data} dispatch={dispatch} />
      </main>

      <footer className={styles.footer}>
        <div>{new Date().getFullYear()}</div>
      </footer>
    </div>
  )
}
