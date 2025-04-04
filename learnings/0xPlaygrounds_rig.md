├── .github
    ├── ISSUE_TEMPLATE
    │   ├── bug-report.md
    │   ├── feature-or-improvement-request.md
    │   ├── new-model-provider.md
    │   └── vector-store-integration-request.md
    ├── PULL_REQUEST_TEMPLATE
    │   ├── new-model-provider.md
    │   ├── new-vector-store.md
    │   └── other.md
    └── workflows
    │   ├── cd.yaml
    │   └── ci.yaml
├── .gitignore
├── .pre-commit-config.yaml
├── CONTRIBUTING.md
├── Cargo.lock
├── Cargo.toml
├── LICENSE
├── README.md
├── img
    ├── built-by-playgrounds.svg
    ├── by-playgrounds.svg
    ├── rig-playgrounds-dark.svg
    ├── rig-playgrounds-light.svg
    ├── rig_logo.svg
    └── rig_logo_dark.svg
├── rig-core
    ├── .gitignore
    ├── CHANGELOG.md
    ├── Cargo.toml
    ├── LICENSE
    ├── README.md
    ├── examples
    │   ├── agent.rs
    │   ├── agent_autonomous.rs
    │   ├── agent_evaluator_optimizer.rs
    │   ├── agent_orchestrator.rs
    │   ├── agent_parallelization.rs
    │   ├── agent_prompt_chaining.rs
    │   ├── agent_routing.rs
    │   ├── agent_with_cohere.rs
    │   ├── agent_with_context.rs
    │   ├── agent_with_deepseek.rs
    │   ├── agent_with_echochambers.rs
    │   ├── agent_with_galadriel.rs
    │   ├── agent_with_grok.rs
    │   ├── agent_with_groq.rs
    │   ├── agent_with_huggingface.rs
    │   ├── agent_with_hyperbolic.rs
    │   ├── agent_with_loaders.rs
    │   ├── agent_with_mira.rs
    │   ├── agent_with_moonshot.rs
    │   ├── agent_with_ollama.rs
    │   ├── agent_with_openrouter.rs
    │   ├── agent_with_together.rs
    │   ├── agent_with_tools.rs
    │   ├── anthropic_agent.rs
    │   ├── anthropic_streaming.rs
    │   ├── anthropic_streaming_with_tools.rs
    │   ├── audio
    │   │   └── en-us-natural-speech.mp3
    │   ├── calculator_chatbot.rs
    │   ├── chain.rs
    │   ├── debate.rs
    │   ├── documents
    │   │   └── deepseek_r1.pdf
    │   ├── extractor.rs
    │   ├── extractor_with_deepseek.rs
    │   ├── gemini_agent.rs
    │   ├── gemini_embeddings.rs
    │   ├── gemini_extractor.rs
    │   ├── gemini_streaming.rs
    │   ├── gemini_streaming_with_tools.rs
    │   ├── huggingface_image_generation.rs
    │   ├── huggingface_streaming.rs
    │   ├── huggingface_subproviders.rs
    │   ├── hyperbolic_audio_generation.rs
    │   ├── hyperbolic_image_generation.rs
    │   ├── image.rs
    │   ├── image_ollama.rs
    │   ├── images
    │   │   └── camponotus_flavomarginatus_ant.jpg
    │   ├── loaders.rs
    │   ├── mcp_tool.rs
    │   ├── multi_agent.rs
    │   ├── multi_extract.rs
    │   ├── multi_turn_agent.rs
    │   ├── ollama_streaming.rs
    │   ├── ollama_streaming_with_tools.rs
    │   ├── openai_audio_generation.rs
    │   ├── openai_image_generation.rs
    │   ├── openai_streaming.rs
    │   ├── openai_streaming_with_tools.rs
    │   ├── pdf_agent.rs
    │   ├── perplexity_agent.rs
    │   ├── rag.rs
    │   ├── rag_dynamic_tools.rs
    │   ├── rag_ollama.rs
    │   ├── sentiment_classifier.rs
    │   ├── simple_model.rs
    │   ├── together_embeddings.rs
    │   ├── together_streaming.rs
    │   ├── together_streaming_with_tools.rs
    │   ├── transcription.rs
    │   ├── vector_search.rs
    │   ├── vector_search_cohere.rs
    │   ├── vector_search_ollama.rs
    │   ├── xai_embeddings.rs
    │   └── xai_streaming.rs
    ├── rig-core-derive
    │   ├── Cargo.toml
    │   └── src
    │   │   ├── basic.rs
    │   │   ├── custom.rs
    │   │   ├── embed.rs
    │   │   └── lib.rs
    ├── src
    │   ├── agent.rs
    │   ├── audio_generation.rs
    │   ├── cli_chatbot.rs
    │   ├── completion
    │   │   ├── message.rs
    │   │   ├── mod.rs
    │   │   └── request.rs
    │   ├── embeddings
    │   │   ├── builder.rs
    │   │   ├── distance.rs
    │   │   ├── embed.rs
    │   │   ├── embedding.rs
    │   │   ├── mod.rs
    │   │   └── tool.rs
    │   ├── extractor.rs
    │   ├── image_generation.rs
    │   ├── json_utils.rs
    │   ├── lib.rs
    │   ├── loaders
    │   │   ├── epub
    │   │   │   ├── errors.rs
    │   │   │   ├── loader.rs
    │   │   │   ├── mod.rs
    │   │   │   └── text_processors.rs
    │   │   ├── file.rs
    │   │   ├── mod.rs
    │   │   └── pdf.rs
    │   ├── one_or_many.rs
    │   ├── pipeline
    │   │   ├── agent_ops.rs
    │   │   ├── conditional.rs
    │   │   ├── mod.rs
    │   │   ├── op.rs
    │   │   ├── parallel.rs
    │   │   └── try_op.rs
    │   ├── providers
    │   │   ├── anthropic
    │   │   │   ├── client.rs
    │   │   │   ├── completion.rs
    │   │   │   ├── decoders
    │   │   │   │   ├── jsonl.rs
    │   │   │   │   ├── line.rs
    │   │   │   │   ├── mod.rs
    │   │   │   │   └── sse.rs
    │   │   │   ├── mod.rs
    │   │   │   └── streaming.rs
    │   │   ├── azure.rs
    │   │   ├── cohere
    │   │   │   ├── client.rs
    │   │   │   ├── completion.rs
    │   │   │   ├── embeddings.rs
    │   │   │   └── mod.rs
    │   │   ├── deepseek.rs
    │   │   ├── galadriel.rs
    │   │   ├── gemini
    │   │   │   ├── client.rs
    │   │   │   ├── completion.rs
    │   │   │   ├── embedding.rs
    │   │   │   ├── mod.rs
    │   │   │   ├── streaming.rs
    │   │   │   └── transcription.rs
    │   │   ├── groq.rs
    │   │   ├── huggingface
    │   │   │   ├── client.rs
    │   │   │   ├── completion.rs
    │   │   │   ├── image_generation.rs
    │   │   │   ├── mod.rs
    │   │   │   ├── streaming.rs
    │   │   │   └── transcription.rs
    │   │   ├── hyperbolic.rs
    │   │   ├── mira.rs
    │   │   ├── mod.rs
    │   │   ├── moonshot.rs
    │   │   ├── ollama.rs
    │   │   ├── openai
    │   │   │   ├── audio_generation.rs
    │   │   │   ├── client.rs
    │   │   │   ├── completion.rs
    │   │   │   ├── embedding.rs
    │   │   │   ├── image_generation.rs
    │   │   │   ├── mod.rs
    │   │   │   ├── streaming.rs
    │   │   │   └── transcription.rs
    │   │   ├── openrouter.rs
    │   │   ├── perplexity.rs
    │   │   ├── together
    │   │   │   ├── client.rs
    │   │   │   ├── completion.rs
    │   │   │   ├── embedding.rs
    │   │   │   ├── mod.rs
    │   │   │   └── streaming.rs
    │   │   └── xai
    │   │   │   ├── client.rs
    │   │   │   ├── completion.rs
    │   │   │   ├── embedding.rs
    │   │   │   ├── mod.rs
    │   │   │   └── streaming.rs
    │   ├── streaming.rs
    │   ├── tool.rs
    │   ├── transcription.rs
    │   └── vector_store
    │   │   ├── in_memory_store.rs
    │   │   └── mod.rs
    └── tests
    │   ├── data
    │       ├── dummy.epub
    │       ├── dummy.pdf
    │       └── pages.pdf
    │   └── embed_macro.rs
├── rig-eternalai
    ├── CHANGELOG.md
    ├── Cargo.toml
    ├── README.md
    ├── examples
    │   └── agent_with_eternalai.rs
    └── src
    │   ├── eternalai_system_prompt_manager_toolset.rs
    │   ├── json_utils.rs
    │   ├── lib.rs
    │   └── providers
    │       ├── eternalai.rs
    │       └── mod.rs
├── rig-fastembed
    ├── .gitignore
    ├── CHANGELOG.md
    ├── Cargo.toml
    ├── README.md
    ├── examples
    │   ├── vector_search.rs
    │   └── vector_search_local.rs
    └── src
    │   └── lib.rs
├── rig-lancedb
    ├── CHANGELOG.md
    ├── Cargo.toml
    ├── LICENSE
    ├── README.md
    ├── examples
    │   ├── fixtures
    │   │   └── lib.rs
    │   ├── vector_search_local_ann.rs
    │   ├── vector_search_local_enn.rs
    │   └── vector_search_s3_ann.rs
    ├── src
    │   ├── lib.rs
    │   └── utils
    │   │   ├── deserializer.rs
    │   │   └── mod.rs
    └── tests
    │   ├── fixtures
    │       └── lib.rs
    │   └── integration_tests.rs
├── rig-mongodb
    ├── CHANGELOG.md
    ├── Cargo.toml
    ├── LICENSE
    ├── README.md
    ├── examples
    │   └── vector_search_mongodb.rs
    ├── src
    │   └── lib.rs
    └── tests
    │   └── integration_tests.rs
├── rig-neo4j
    ├── CHANGELOG.md
    ├── Cargo.toml
    ├── LICENSE
    ├── README.md
    ├── examples
    │   ├── display
    │   │   └── lib.rs
    │   ├── vector_search_movies_add_embeddings.rs
    │   ├── vector_search_movies_consume.rs
    │   └── vector_search_simple.rs
    ├── src
    │   ├── lib.rs
    │   └── vector_index.rs
    └── tests
    │   └── integration_tests.rs
├── rig-postgres
    ├── CHANGELOG.md
    ├── Cargo.toml
    ├── LICENSE
    ├── Makefile
    ├── README.md
    ├── examples
    │   ├── migrations
    │   │   └── 001_setup.sql
    │   └── vector_search_postgres.rs
    ├── src
    │   └── lib.rs
    └── tests
    │   ├── integration_tests.rs
    │   └── migrations
    │       └── 001_setup.sql
├── rig-qdrant
    ├── CHANGELOG.md
    ├── Cargo.toml
    ├── LICENSE
    ├── README.md
    ├── examples
    │   └── qdrant_vector_search.rs
    ├── src
    │   └── lib.rs
    └── tests
    │   └── integration_tests.rs
├── rig-sqlite
    ├── CHANGELOG.md
    ├── Cargo.toml
    ├── LICENSE
    ├── README.md
    ├── examples
    │   └── vector_search_sqlite.rs
    ├── src
    │   └── lib.rs
    └── tests
    │   └── integration_test.rs
└── rig-surrealdb
    ├── CHANGELOG.md
    ├── Cargo.toml
    ├── README.md
    ├── examples
        ├── migrations.surql
        └── vector_search_surreal.rs
    └── src
        └── lib.rs


/.github/ISSUE_TEMPLATE/bug-report.md:
--------------------------------------------------------------------------------
 1 | ---
 2 | name: Bug report
 3 | about: Create a report to help us improve
 4 | title: 'bug: <title>'
 5 | labels: bug
 6 | assignees: ''
 7 | 
 8 | ---
 9 | 
10 | - [ ] I have looked for existing issues (including closed) about this
11 | 
12 | ## Bug Report
13 | <!--
14 | A clear and concise description of what the bug is.
15 | --->
16 | 
17 | ## Reproduction
18 | <!--
19 | Code snippet.
20 | --->
21 | 
22 | ## Expected behavior
23 | <!--
24 | A clear and concise description of what you expected to happen.
25 | --->
26 | 
27 | ## Screenshots
28 | <!--
29 | If applicable, add screenshots to help explain your problem.
30 | --->
31 | 
32 | ## Additional context
33 | <!--
34 | Add any other context about the problem here.
35 | --->
36 | 


--------------------------------------------------------------------------------
/.github/ISSUE_TEMPLATE/feature-or-improvement-request.md:
--------------------------------------------------------------------------------
 1 | ---
 2 | name: Feature or improvement request
 3 | about: Suggest an idea for this project
 4 | title: 'feat: <title>'
 5 | labels: feat
 6 | assignees: ''
 7 | 
 8 | ---
 9 | 
10 | - [ ] I have looked for existing issues (including closed) about this
11 | 
12 | ## Feature Request
13 | <!--
14 | High level description of the requested feature or improvement.
15 | -->
16 | 
17 | ### Motivation
18 | <!--
19 | Please describe the use case(s) or other motivation for the new feature.
20 | -->
21 | 
22 | ### Proposal
23 | <!--
24 | How should the new feature be implemented, and why? Add any considered
25 | drawbacks.
26 | -->
27 | 
28 | ### Alternatives
29 | <!--
30 | Are there other ways to solve this problem that you've considered? What are
31 | their potential drawbacks? Why was the proposed solution chosen over these
32 | alternatives?
33 | -->
34 | 


--------------------------------------------------------------------------------
/.github/ISSUE_TEMPLATE/new-model-provider.md:
--------------------------------------------------------------------------------
 1 | ---
 2 | name: New model provider
 3 | about: Suggest a new model provider to integrate
 4 | title: 'feat: Add support for X'
 5 | labels: feat, model
 6 | assignees: ''
 7 | 
 8 | ---
 9 | 
10 | ## Model Provider Integration Request
11 | <!--
12 | Describe the model provider and the models that it provides.
13 | -->
14 | 
15 | ### Resources
16 | <!--
17 | Links to API docs, SDKs or any other information that would help in the integration of the new model provider.
18 | -->
19 | 


--------------------------------------------------------------------------------
/.github/ISSUE_TEMPLATE/vector-store-integration-request.md:
--------------------------------------------------------------------------------
 1 | ---
 2 | name: Vector store integration request
 3 | about: Suggest a new vector store to integrate
 4 | title: 'feat: Add support for X vector store'
 5 | labels: data store, feat
 6 | assignees: ''
 7 | 
 8 | ---
 9 | 
10 | ## Vector Store Integration Request
11 | <!--
12 | Describe the vector store and the features it provides (e.g.: is it cloud only? a plugin to an existing database? document-based or relational? etc.)
13 | -->
14 | 
15 | ### Resources
16 | <!--
17 | Links to API docs, SDKs or any other information that would help in the integration of the new vector store.
18 | -->
19 | 


--------------------------------------------------------------------------------
/.github/PULL_REQUEST_TEMPLATE/new-model-provider.md:
--------------------------------------------------------------------------------
 1 | ---
 2 | name: New model provider
 3 | about: Suggest a new model provider to integrate
 4 | title: 'feat: Add support for X'
 5 | labels: feat, model
 6 | assignees: ''
 7 | 
 8 | ---
 9 | 
10 | # New model provider: <Model Provider Name>
11 | 
12 | ## Description
13 | 
14 | Please describe the model provider you are adding to the project. Include links to their website and their api documentation.
15 | 
16 | Fixes # (issue)
17 | 
18 | ## Testing
19 | 
20 | Please describe the tests that you ran to verify your changes. Provide instructions so we can reproduce your results.
21 | 
22 | - [ ] Test A
23 | - [ ] Test B
24 | 
25 | ## Checklist:
26 | 
27 | - [ ] My code follows the style guidelines of this project
28 | - [ ] I have commented my code, particularly in hard-to-understand areas
29 | - [ ] I have made corresponding changes to the documentation
30 | - [ ] My changes generate no new warnings
31 | - [ ] I have added tests that prove my fix is effective or that my feature works
32 | - [ ] New and existing unit tests pass locally with my changes
33 | - [ ] I've reviewed the provider API documentation and implemented the types of response accurately
34 | 
35 | ## Notes
36 | 
37 | Any notes you wish to include about the nature of this PR (implementation details, specific questions, etc.)
38 | 


--------------------------------------------------------------------------------
/.github/PULL_REQUEST_TEMPLATE/new-vector-store.md:
--------------------------------------------------------------------------------
 1 | ---
 2 | name: Vector store integration request
 3 | about: Suggest a new vector store to integrate
 4 | title: 'feat: Add support for X vector store'
 5 | labels: data store, feat
 6 | assignees: ''
 7 | 
 8 | ---
 9 | 
10 | # New vector store: <Vector Store Name>
11 | 
12 | ## Description
13 | 
14 | Please describe the vector store you are adding to the project. Include links to their website and their api documentation.
15 | 
16 | Fixes # (issue)
17 | 
18 | ## Testing
19 | 
20 | Please describe the tests that you ran to verify your changes. Provide instructions so we can reproduce your results.
21 | 
22 | - [ ] Test A
23 | - [ ] Test B
24 | 
25 | ## Checklist:
26 | 
27 | - [ ] My code follows the style guidelines of this project
28 | - [ ] I have performed a self-review of my own code
29 | - [ ] I have commented my code, particularly in hard-to-understand areas
30 | - [ ] I have made corresponding changes to the documentation
31 | - [ ] My changes generate no new warnings
32 | - [ ] I have added tests that prove my fix is effective or that my feature works
33 | - [ ] New and existing unit tests pass locally with my changes
34 | - [ ] Any dependent changes have been merged and published in downstream modules
35 | - [ ] I've reviewed the vector store API documentation and implemented the types of response accurately
36 | 
37 | ## Notes
38 | 
39 | Any notes you wish to include about the nature of this PR (implementation details, specific questions, etc.)
40 | 


--------------------------------------------------------------------------------
/.github/PULL_REQUEST_TEMPLATE/other.md:
--------------------------------------------------------------------------------
 1 | ---
 2 | name: General pull request
 3 | about: Makes a change to the code base
 4 | title: ''
 5 | labels: ''
 6 | assignees: ''
 7 | 
 8 | ---
 9 | 
10 | # <Pull Request Title>
11 | 
12 | ## Description
13 | 
14 | Please include a summary of the changes and the related issue. Please also include relevant motivation and context. List any dependencies that are required for this change.
15 | 
16 | Fixes # (issue)
17 | 
18 | ## Type of change
19 | 
20 | Please delete options that are not relevant.
21 | 
22 | - [ ] Bug fix
23 | - [ ] New feature
24 | - [ ] Breaking change
25 | - [ ] Documentation update
26 | 
27 | ## Testing
28 | 
29 | Please describe the tests that you ran to verify your changes. Provide instructions so we can reproduce your results.
30 | 
31 | - [ ] Test A
32 | - [ ] Test B
33 | 
34 | ## Checklist:
35 | 
36 | - [ ] My code follows the style guidelines of this project
37 | - [ ] I have commented my code, particularly in hard-to-understand areas
38 | - [ ] I have made corresponding changes to the documentation
39 | - [ ] My changes generate no new warnings
40 | - [ ] I have added tests that prove my fix is effective or that my feature works
41 | - [ ] New and existing unit tests pass locally with my changes
42 | 
43 | ## Notes
44 | 
45 | Any notes you wish to include about the nature of this PR (implementation details, specific questions, etc.)
46 | 


--------------------------------------------------------------------------------
/.github/workflows/cd.yaml:
--------------------------------------------------------------------------------
 1 | name: "Build & Release"
 2 | 
 3 | on:
 4 |   push:
 5 |     branches:
 6 |       - main
 7 |   workflow_dispatch:
 8 | 
 9 | jobs:
10 |   run-ci:
11 |     permissions:
12 |         checks: write
13 |     uses: ./.github/workflows/ci.yaml
14 |     secrets: inherit
15 | 
16 |   release-plz:
17 |     name: Release-plz
18 |     needs: run-ci
19 |     runs-on: ubuntu-latest
20 |     permissions:
21 |         pull-requests: write
22 |         contents: write
23 |     steps:
24 |       - name: Checkout
25 |         uses: actions/checkout@v4
26 |         with:
27 |           fetch-depth: 0
28 | 
29 |       - name: Install Rust toolchain
30 |         uses: actions-rust-lang/setup-rust-toolchain@v1
31 | 
32 |       # Required to compile rig-lancedb
33 |       - name: Install Protoc
34 |         uses: arduino/setup-protoc@v3
35 | 
36 |       - name: Run release-plz
37 |         uses: MarcoIeni/release-plz-action@v0.5
38 |         env:
39 |           GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
40 |           CARGO_REGISTRY_TOKEN: ${{ secrets.CARGO_REGISTRY_TOKEN }}


--------------------------------------------------------------------------------
/.gitignore:
--------------------------------------------------------------------------------
1 | .env
2 | target/
3 | .DS_Store
4 | .idea/
5 | .vscode/
6 | .devcontainer/


--------------------------------------------------------------------------------
/.pre-commit-config.yaml:
--------------------------------------------------------------------------------
 1 | # See https://pre-commit.com for more information
 2 | # See https://pre-commit.com/hooks.html for more hooks
 3 | repos:
 4 | -   repo: https://github.com/pre-commit/pre-commit-hooks
 5 |     rev: v4.6.0
 6 |     hooks:
 7 |     -   id: trailing-whitespace
 8 |     -   id: end-of-file-fixer
 9 |     -   id: check-yaml
10 |     -   id: check-added-large-files
11 |     -   id: check-json
12 |     -   id: check-case-conflict
13 |     -   id: check-merge-conflict
14 | 
15 | 
16 | -   repo: https://github.com/doublify/pre-commit-rust
17 |     rev: v1.0
18 |     hooks:
19 |     -   id: fmt
20 |     -   id: cargo-check
21 |     -   id: clippy
22 | 
23 | - repo: https://github.com/commitizen-tools/commitizen
24 |   rev: v2.20.0
25 |   hooks:
26 |     - id: commitizen
27 |       stages: [commit-msg]
28 | 


--------------------------------------------------------------------------------
/CONTRIBUTING.md:
--------------------------------------------------------------------------------
 1 | # Contributing to Rig
 2 | 
 3 | Thank you for considering contributing to Rig! Here are some guidelines to help you get started.
 4 | 
 5 | General guidelines and requested contributions can be found in the [How to Contribute](https://docs.rig.rs/docs/how_to_contribute) section of the documentation.
 6 | 
 7 | ## Issues
 8 | 
 9 | Before reporting an issue, please check existing or similar issues that are currently tracked.
10 | 
11 | ## Pull Requests
12 | 
13 | Contributions are always encouraged and welcome. Before creating a pull request, create a new issue that tracks that pull request describing the problem in more detail. Pull request descriptions should include information about it's implementation, especially if it makes changes to existing abstractions.
14 | 
15 | PRs should be small and focused and should avoid interacting with multiple facets of the library. This may result in a larger PR being split into two or more smaller PRs. Commit messages should follow the [Conventional Commit](https://conventionalcommits.org/en/v1.0.0) format (prefixing with `feat`, `fix`, etc.) as this integrates into our auto-releases via a [release-plz](https://github.com/MarcoIeni/release-plz) Github action.
16 | 
17 | **Working on your first Pull Request?** You can learn how from this *free* series [How to Contribute to an Open Source Project on GitHub](https://kcd.im/pull-request) 
18 | 
19 | ## Project Structure
20 | 
21 | Rig is split up into multiple crates in a monorepo structure. The main crate `rig-core` contains all of the foundational abstractions for building with LLMs. This crate avoids adding many new dependencies to keep to lean and only really contains simple provider integrations on top of the base layer of abstractions. Side crates are leveraged to help add important first-party behavior without over burdening the main library with dependencies. For example, `rig-mongodb` contains extra dependencies to be able to interact with `mongodb` as a vector store.
22 | 
23 | If you are unsure whether a side-crate should live in the main repo, you can spin up a personal repo containing your crate and create an issue in our repo making the case on whether this side-crate should be integrated in the main repo and maintained by the Rig team.
24 | 
25 | 
26 | ## Developing
27 | 
28 | ### Setup
29 | 
30 | This should be similar to most rust projects.
31 | 
32 | ```bash
33 | git clone https://github.com/0xplaygrounds/rig
34 | cd rig
35 | cargo test
36 | ```
37 | 
38 | ### Clippy and Fmt
39 | 
40 | We enforce both `clippy` and `fmt` for all pull requests.
41 | 
42 | ```bash
43 | cargo clippy -- -D warnings
44 | ```
45 | 
46 | ```bash
47 | cargo fmt
48 | ```
49 | 
50 | 
51 | ### Tests
52 | 
53 | Make sure to test against the test suite before making a pull request.
54 | 
55 | ```bash
56 | cargo test
57 | ```
58 | 


--------------------------------------------------------------------------------
/Cargo.toml:
--------------------------------------------------------------------------------
 1 | [workspace]
 2 | resolver = "2"
 3 | members = [
 4 |     "rig-core",
 5 |     "rig-lancedb",
 6 |     "rig-mongodb",
 7 |     "rig-neo4j",
 8 |     "rig-postgres",
 9 |     "rig-qdrant",
10 |     "rig-core/rig-core-derive",
11 |     "rig-sqlite",
12 |     "rig-eternalai", "rig-fastembed",
13 |     "rig-surrealdb",
14 | ]
15 | 


--------------------------------------------------------------------------------
/LICENSE:
--------------------------------------------------------------------------------
1 | Copyright (c) 2024, Playgrounds Analytics Inc.
2 | 
3 | Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
4 | 
5 | The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
6 | 
7 | THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
8 | 


--------------------------------------------------------------------------------
/rig-core/.gitignore:
--------------------------------------------------------------------------------
1 | /target
2 | *.log
3 | .env
4 | 


--------------------------------------------------------------------------------
/rig-core/LICENSE:
--------------------------------------------------------------------------------
1 | Copyright (c) 2024, Playgrounds Analytics Inc.
2 | 
3 | Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
4 | 
5 | The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
6 | 
7 | THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
8 | 


--------------------------------------------------------------------------------
/rig-core/README.md:
--------------------------------------------------------------------------------
 1 | # Rig
 2 | Rig is a Rust library for building LLM-powered applications that focuses on ergonomics and modularity.
 3 | 
 4 | More information about this crate can be found in the [crate documentation](https://docs.rs/rig-core/latest/rig/).
 5 | ## Table of contents
 6 | 
 7 | - [Rig](#rig)
 8 |   - [Table of contents](#table-of-contents)
 9 |   - [High-level features](#high-level-features)
10 |   - [Installation](#installation)
11 |   - [Simple example:](#simple-example)
12 |   - [Integrations](#integrations)
13 | 
14 | ## High-level features
15 | - Full support for LLM completion and embedding workflows
16 | - Simple but powerful common abstractions over LLM providers (e.g. OpenAI, Cohere) and vector stores (e.g. MongoDB, SQLite, in-memory)
17 | - Integrate LLMs in your app with minimal boilerplate
18 | 
19 | ## Installation
20 | ```bash
21 | cargo add rig-core
22 | ```
23 | 
24 | ## Simple example:
25 | ```rust
26 | use rig::{completion::Prompt, providers::openai};
27 | 
28 | #[tokio::main]
29 | async fn main() {
30 |     // Create OpenAI client and model
31 |     // This requires the `OPENAI_API_KEY` environment variable to be set.
32 |     let openai_client = openai::Client::from_env();
33 | 
34 |     let gpt4 = openai_client.model("gpt-4").build();
35 | 
36 |     // Prompt the model and print its response
37 |     let response = gpt4
38 |         .prompt("Who are you?")
39 |         .await
40 |         .expect("Failed to prompt GPT-4");
41 | 
42 |     println!("GPT-4: {response}");
43 | }
44 | ```
45 | Note using `#[tokio::main]` requires you enable tokio's `macros` and `rt-multi-thread` features
46 | or just `full` to enable all features (`cargo add tokio --features macros,rt-multi-thread`).
47 | 
48 | ## Integrations
49 | Rig supports the following LLM providers natively:
50 | - OpenAI
51 | - Cohere
52 | - Anthropic
53 | - Perplexity
54 | - Google Gemini
55 | - xAI
56 | - DeepSeek
57 | 
58 | Additionally, Rig currently has the following integration sub-libraries:
59 | - MongoDB vector store: `rig-mongodb`
60 | 


--------------------------------------------------------------------------------
/rig-core/examples/agent.rs:
--------------------------------------------------------------------------------
 1 | use std::env;
 2 | 
 3 | use rig::{completion::Prompt, providers};
 4 | 
 5 | #[tokio::main]
 6 | async fn main() -> Result<(), anyhow::Error> {
 7 |     // Create OpenAI client
 8 |     let client = providers::openai::Client::new(
 9 |         &env::var("OPENAI_API_KEY").expect("OPENAI_API_KEY not set"),
10 |     );
11 | 
12 |     // Create agent with a single context prompt
13 |     let comedian_agent = client
14 |         .agent("gpt-4o")
15 |         .preamble("You are a comedian here to entertain the user using humour and jokes.")
16 |         .build();
17 | 
18 |     // Prompt the agent and print the response
19 |     let response = comedian_agent.prompt("Entertain me!").await?;
20 |     println!("{}", response);
21 | 
22 |     Ok(())
23 | }
24 | 


--------------------------------------------------------------------------------
/rig-core/examples/agent_autonomous.rs:
--------------------------------------------------------------------------------
 1 | use rig::providers::openai::client::Client;
 2 | use schemars::JsonSchema;
 3 | use std::env;
 4 | 
 5 | #[derive(Debug, serde::Deserialize, JsonSchema, serde::Serialize)]
 6 | struct Counter {
 7 |     /// The score of the document
 8 |     number: u32,
 9 | }
10 | 
11 | #[tokio::main]
12 | async fn main() -> Result<(), anyhow::Error> {
13 |     // Create OpenAI client
14 |     let openai_api_key = env::var("OPENAI_API_KEY").expect("OPENAI_API_KEY not set");
15 |     let openai_client = Client::new(&openai_api_key);
16 | 
17 |     let agent = openai_client.extractor::<Counter>("gpt-4")
18 |         .preamble("
19 |             Your role is to add a random number between 1 and 64 (using only integers) to the previous number.
20 |         ")
21 |         .build();
22 | 
23 |     let mut number: u32 = 0;
24 | 
25 |     let mut interval = tokio::time::interval(std::time::Duration::from_secs(1));
26 | 
27 |     // Loop the agent and allow it to run autonomously. If it hits the target number (2000 or above)
28 |     // we then terminate the loop and return the number
29 |     // Note that the tokio interval is to avoid being rate limited
30 |     loop {
31 |         // Prompt the agent and print the response
32 |         let response = agent.extract(&number.to_string()).await.unwrap();
33 | 
34 |         if response.number >= 2000 {
35 |             break;
36 |         } else {
37 |             number += response.number
38 |         }
39 | 
40 |         interval.tick().await;
41 |     }
42 | 
43 |     println!("Finished with number: {number:?}");
44 | 
45 |     Ok(())
46 | }
47 | 


--------------------------------------------------------------------------------
/rig-core/examples/agent_evaluator_optimizer.rs:
--------------------------------------------------------------------------------
 1 | use std::env;
 2 | 
 3 | use rig::completion::Prompt;
 4 | use rig::providers::openai::client::Client;
 5 | use schemars::JsonSchema;
 6 | 
 7 | #[derive(serde::Deserialize, JsonSchema, serde::Serialize, Debug)]
 8 | struct Evaluation {
 9 |     evaluation_status: EvalStatus,
10 |     feedback: String,
11 | }
12 | 
13 | #[derive(serde::Deserialize, JsonSchema, serde::Serialize, Debug, PartialEq)]
14 | enum EvalStatus {
15 |     Pass,
16 |     NeedsImprovement,
17 |     Fail,
18 | }
19 | const TASK: &str = "Implement a Stack with:
20 | 1. push(x)
21 | 2. pop()
22 | 3. getMin()
23 | All operations should be O(1).
24 | ";
25 | 
26 | #[tokio::main]
27 | async fn main() -> Result<(), anyhow::Error> {
28 |     // Create OpenAI client
29 |     let openai_api_key = env::var("OPENAI_API_KEY").expect("OPENAI_API_KEY not set");
30 |     let openai_client = Client::new(&openai_api_key);
31 | 
32 |     let generator_agent = openai_client
33 |         .agent("gpt-4")
34 |         .preamble(
35 |             "
36 |             Your goal is to complete the task based on <user input>. If there are feedback
37 |             from your previous generations, you should reflect on them to improve your solution
38 | 
39 |             Output your answer concisely in the following format:
40 | 
41 |             Thoughts:
42 |             [Your understanding of the task and feedback and how you plan to improve]
43 | 
44 |             Response:
45 |             [Your code implementation here]
46 |         ",
47 |         )
48 |         .build();
49 | 
50 |     let evaluator_agent = openai_client.extractor::<Evaluation>("gpt-4")
51 |         .preamble("
52 |             Evaluate this following code implementation for:
53 |             1. code correctness
54 |             2. time complexity
55 |             3. style and best practices
56 | 
57 |             You should be evaluating only and not attempting to solve the task.
58 | 
59 |             Only output \"PASS\" if all criteria are met and you have no further suggestions for improvements.
60 | 
61 |             Provide detailed feedback if there are areas that need improvement. You should specify what needs improvement and why.
62 | 
63 |             Only output JSON.
64 |         ")
65 |         .build();
66 | 
67 |     let mut memories: Vec<String> = Vec::new();
68 | 
69 |     let mut response = generator_agent.prompt(TASK).await.unwrap();
70 |     memories.push(response.clone());
71 | 
72 |     loop {
73 |         let eval_result = evaluator_agent
74 |             .extract(&format!("{TASK}\n\n{response}"))
75 |             .await
76 |             .unwrap();
77 | 
78 |         if eval_result.evaluation_status == EvalStatus::Pass {
79 |             break;
80 |         } else {
81 |             let context = format!("{TASK}\n\n{}", eval_result.feedback);
82 | 
83 |             response = generator_agent.prompt(context).await.unwrap();
84 |             memories.push(response.clone());
85 |         }
86 |     }
87 | 
88 |     println!("Response: {response}");
89 | 
90 |     Ok(())
91 | }
92 | 


--------------------------------------------------------------------------------
/rig-core/examples/agent_parallelization.rs:
--------------------------------------------------------------------------------
 1 | use std::env;
 2 | 
 3 | use rig::pipeline::agent_ops::extract;
 4 | use rig::providers::openai::client::Client;
 5 | use rig::{
 6 |     parallel,
 7 |     pipeline::{self, passthrough, Op},
 8 | };
 9 | use schemars::JsonSchema;
10 | 
11 | #[derive(serde::Deserialize, JsonSchema, serde::Serialize)]
12 | struct DocumentScore {
13 |     /// The score of the document
14 |     score: f32,
15 | }
16 | 
17 | #[tokio::main]
18 | async fn main() -> Result<(), anyhow::Error> {
19 |     // Create OpenAI client
20 |     let openai_api_key = env::var("OPENAI_API_KEY").expect("OPENAI_API_KEY not set");
21 |     let openai_client = Client::new(&openai_api_key);
22 | 
23 |     let manipulation_agent = openai_client
24 |         .extractor::<DocumentScore>("gpt-4")
25 |         .preamble(
26 |             "
27 |             Your role is to score a user's statement on how manipulative it sounds between 0 and 1.
28 |         ",
29 |         )
30 |         .build();
31 | 
32 |     let depression_agent = openai_client
33 |         .extractor::<DocumentScore>("gpt-4")
34 |         .preamble(
35 |             "
36 |             Your role is to score a user's statement on how depressive it sounds between 0 and 1.
37 |         ",
38 |         )
39 |         .build();
40 | 
41 |     let intelligent_agent = openai_client
42 |         .extractor::<DocumentScore>("gpt-4")
43 |         .preamble(
44 |             "
45 |             Your role is to score a user's statement on how intelligent it sounds between 0 and 1.
46 |         ",
47 |         )
48 |         .build();
49 | 
50 |     let chain = pipeline::new()
51 |         .chain(parallel!(
52 |             passthrough(),
53 |             extract(manipulation_agent),
54 |             extract(depression_agent),
55 |             extract(intelligent_agent)
56 |         ))
57 |         .map(|(statement, manip_score, dep_score, int_score)| {
58 |             format!(
59 |                 "
60 |                 Original statement: {statement}
61 |                 Manipulation sentiment score: {}
62 |                 Depression sentiment score: {}
63 |                 Intelligence sentiment score: {}
64 |                 ",
65 |                 manip_score.unwrap().score,
66 |                 dep_score.unwrap().score,
67 |                 int_score.unwrap().score
68 |             )
69 |         });
70 | 
71 |     // Prompt the agent and print the response
72 |     let response = chain
73 |         .call("I hate swimming. The water always gets in my eyes.")
74 |         .await;
75 | 
76 |     println!("Pipeline run: {response:?}");
77 | 
78 |     Ok(())
79 | }
80 | 


--------------------------------------------------------------------------------
/rig-core/examples/agent_prompt_chaining.rs:
--------------------------------------------------------------------------------
 1 | use std::env;
 2 | 
 3 | use rig::pipeline::{self, Op};
 4 | use rig::providers::openai::client::Client;
 5 | 
 6 | #[tokio::main]
 7 | async fn main() -> Result<(), anyhow::Error> {
 8 |     // Create OpenAI client
 9 |     let openai_api_key = env::var("OPENAI_API_KEY").expect("OPENAI_API_KEY not set");
10 |     let openai_client = Client::new(&openai_api_key);
11 | 
12 |     let rng_agent = openai_client.agent("gpt-4")
13 |         .preamble("
14 |             You are a random number generator designed to only either output a single whole integer that is 0 or 1. Only return the number.
15 |         ")
16 |         .build();
17 | 
18 |     let adder_agent = openai_client.agent("gpt-4")
19 |         .preamble("
20 |             You are a mathematician who adds 1000 to every number passed into the context, except if the number is 0 - in which case don't add anything. Only return the number.
21 |         ")
22 |         .build();
23 | 
24 |     let chain = pipeline::new()
25 |         // Generate a whole number that is either 0 and 1
26 |         .prompt(rng_agent)
27 |         .map(|x| x.unwrap())
28 |         .prompt(adder_agent);
29 | 
30 |     // Prompt the agent and print the response
31 |     let response = chain
32 |         .call("Please generate a single whole integer that is 0 or 1".to_string())
33 |         .await;
34 | 
35 |     println!("Pipeline result: {response:?}");
36 | 
37 |     Ok(())
38 | }
39 | 


--------------------------------------------------------------------------------
/rig-core/examples/agent_routing.rs:
--------------------------------------------------------------------------------
 1 | use std::env;
 2 | 
 3 | use rig::pipeline::{self, Op, TryOp};
 4 | use rig::providers::openai::client::Client;
 5 | 
 6 | #[tokio::main]
 7 | async fn main() -> Result<(), anyhow::Error> {
 8 |     // Create OpenAI client
 9 |     let openai_api_key = env::var("OPENAI_API_KEY").expect("OPENAI_API_KEY not set");
10 |     let openai_client = Client::new(&openai_api_key);
11 | 
12 |     // Note that you can also create your own semantic router for this
13 |     // that uses a vector store under the hood
14 |     let animal_agent = openai_client.agent("gpt-4")
15 |         .preamble("
16 |             Your role is to categorise the user's statement using the following values: [sheep, cow, dog]
17 | 
18 |             Return only the value.
19 |         ")
20 |         .build();
21 | 
22 |     let default_agent = openai_client.agent("gpt-4").build();
23 | 
24 |     let chain = pipeline::new()
25 |         // Use our classifier agent to classify the agent under a number of fixed topics
26 |         .prompt(animal_agent)
27 |         // Change the prompt depending on the output from the prompt
28 |         .map_ok(|x: String| match x.trim() {
29 |             "cow" => Ok("Tell me a fact about the United States of America.".to_string()),
30 |             "sheep" => Ok("Calculate 5+5 for me. Return only the number.".to_string()),
31 |             "dog" => Ok("Write me a poem about cashews".to_string()),
32 |             message => Err(format!("Could not process - received category: {message}")),
33 |         })
34 |         .map(|x| x.unwrap().unwrap())
35 |         // Send the prompt back into another agent with no pre-amble
36 |         .prompt(default_agent);
37 | 
38 |     // Prompt the agent and print the response
39 |     let response = chain.try_call("Sheep can self-medicate").await?;
40 | 
41 |     println!("Pipeline result: {response:?}");
42 | 
43 |     Ok(())
44 | }
45 | 


--------------------------------------------------------------------------------
/rig-core/examples/agent_with_context.rs:
--------------------------------------------------------------------------------
 1 | use std::env;
 2 | 
 3 | use rig::{agent::AgentBuilder, completion::Prompt, providers::cohere};
 4 | 
 5 | #[tokio::main]
 6 | async fn main() -> Result<(), anyhow::Error> {
 7 |     // Create OpenAI and Cohere clients
 8 |     // let openai_client = openai::Client::new(&env::var("OPENAI_API_KEY").expect("OPENAI_API_KEY not set"));
 9 |     let cohere_client =
10 |         cohere::Client::new(&env::var("COHERE_API_KEY").expect("COHERE_API_KEY not set"));
11 | 
12 |     // let model = openai_client.completion_model("gpt-4");
13 |     let model = cohere_client.completion_model("command-r");
14 | 
15 |     // Create an agent with multiple context documents
16 |     let agent = AgentBuilder::new(model)
17 |         .context("Definition of a *flurbo*: A flurbo is a green alien that lives on cold planets")
18 |         .context("Definition of a *glarb-glarb*: A glarb-glarb is an ancient tool used by the ancestors of the inhabitants of planet Jiro to farm the land.")
19 |         .context("Definition of a *linglingdong*: A term used by inhabitants of the far side of the moon to describe humans.")
20 |         .build();
21 | 
22 |     // Prompt the agent and print the response
23 |     let response = agent.prompt("What does \"glarb-glarb\" mean?").await?;
24 | 
25 |     println!("{}", response);
26 | 
27 |     Ok(())
28 | }
29 | 


--------------------------------------------------------------------------------
/rig-core/examples/agent_with_galadriel.rs:
--------------------------------------------------------------------------------
 1 | use rig::{completion::Prompt, providers};
 2 | use std::env;
 3 | 
 4 | #[tokio::main]
 5 | async fn main() -> Result<(), anyhow::Error> {
 6 |     // Create Galadriel client
 7 |     let client = providers::galadriel::Client::new(
 8 |         &env::var("GALADRIEL_API_KEY").expect("GALADRIEL_API_KEY not set"),
 9 |         env::var("GALADRIEL_FINE_TUNE_API_KEY").ok().as_deref(),
10 |     );
11 | 
12 |     // Create agent with a single context prompt
13 |     let comedian_agent = client
14 |         .agent("gpt-4o")
15 |         .preamble("You are a comedian here to entertain the user using humour and jokes.")
16 |         .build();
17 | 
18 |     // Prompt the agent and print the response
19 |     let response = comedian_agent.prompt("Entertain me!").await?;
20 |     println!("{}", response);
21 | 
22 |     Ok(())
23 | }
24 | 


--------------------------------------------------------------------------------
/rig-core/examples/agent_with_groq.rs:
--------------------------------------------------------------------------------
 1 | use std::env;
 2 | 
 3 | use rig::{
 4 |     completion::Prompt,
 5 |     providers::{self, groq::DEEPSEEK_R1_DISTILL_LLAMA_70B},
 6 | };
 7 | 
 8 | #[tokio::main]
 9 | async fn main() -> Result<(), anyhow::Error> {
10 |     // Create OpenAI client
11 |     let client =
12 |         providers::groq::Client::new(&env::var("GROQ_API_KEY").expect("GROQ_API_KEY not set"));
13 | 
14 |     // Create agent with a single context prompt
15 |     let comedian_agent = client
16 |         .agent(DEEPSEEK_R1_DISTILL_LLAMA_70B)
17 |         .preamble("You are a comedian here to entertain the user using humour and jokes.")
18 |         .build();
19 | 
20 |     // Prompt the agent and print the response
21 |     let response = comedian_agent.prompt("Entertain me!").await?;
22 |     println!("{}", response);
23 | 
24 |     Ok(())
25 | }
26 | 


--------------------------------------------------------------------------------
/rig-core/examples/agent_with_hyperbolic.rs:
--------------------------------------------------------------------------------
 1 | use std::env;
 2 | 
 3 | use rig::{completion::Prompt, providers};
 4 | 
 5 | #[tokio::main]
 6 | async fn main() -> Result<(), anyhow::Error> {
 7 |     // Create OpenAI client
 8 |     let client = providers::hyperbolic::Client::new(
 9 |         &env::var("HYPERBOLIC_API_KEY").expect("HYPERBOLIC_API_KEY not set"),
10 |     );
11 | 
12 |     // Create agent with a single context prompt
13 |     let comedian_agent = client
14 |         .agent(rig::providers::hyperbolic::DEEPSEEK_R1)
15 |         .preamble("You are a comedian here to entertain the user using humour and jokes.")
16 |         .build();
17 | 
18 |     // Prompt the agent and print the response
19 |     let response = comedian_agent.prompt("Entertain me!").await?;
20 |     println!("{}", response);
21 | 
22 |     Ok(())
23 | }
24 | 


--------------------------------------------------------------------------------
/rig-core/examples/agent_with_loaders.rs:
--------------------------------------------------------------------------------
 1 | use std::env;
 2 | 
 3 | use rig::{
 4 |     agent::AgentBuilder,
 5 |     completion::Prompt,
 6 |     loaders::FileLoader,
 7 |     providers::openai::{self, GPT_4O},
 8 | };
 9 | 
10 | #[tokio::main]
11 | async fn main() -> Result<(), anyhow::Error> {
12 |     let openai_client =
13 |         openai::Client::new(&env::var("OPENAI_API_KEY").expect("OPENAI_API_KEY not set"));
14 | 
15 |     let model = openai_client.completion_model(GPT_4O);
16 | 
17 |     // Load in all the rust examples
18 |     let examples = FileLoader::with_glob("rig-core/examples/*.rs")?
19 |         .read_with_path()
20 |         .ignore_errors()
21 |         .into_iter();
22 | 
23 |     // Create an agent with multiple context documents
24 |     let agent = examples
25 |         .fold(AgentBuilder::new(model), |builder, (path, content)| {
26 |             builder.context(format!("Rust Example {:?}:\n{}", path, content).as_str())
27 |         })
28 |         .build();
29 | 
30 |     // Prompt the agent and print the response
31 |     let response = agent
32 |         .prompt("Which rust example is best suited for the operation 1 + 2")
33 |         .await?;
34 | 
35 |     println!("{}", response);
36 | 
37 |     Ok(())
38 | }
39 | 


--------------------------------------------------------------------------------
/rig-core/examples/agent_with_moonshot.rs:
--------------------------------------------------------------------------------
 1 | use rig::agent::AgentBuilder;
 2 | use rig::providers::moonshot::{CompletionModel, MOONSHOT_CHAT};
 3 | use rig::{completion::Prompt, providers};
 4 | 
 5 | #[tokio::main]
 6 | async fn main() -> Result<(), anyhow::Error> {
 7 |     println!("Running basic agent with moonshot");
 8 |     basic_moonshot().await?;
 9 | 
10 |     println!("\nRunning moonshot agent with context");
11 |     context_moonshot().await?;
12 | 
13 |     println!("\n\nAll agents ran successfully");
14 |     Ok(())
15 | }
16 | 
17 | fn client() -> providers::moonshot::Client {
18 |     providers::moonshot::Client::from_env()
19 | }
20 | 
21 | fn partial_agent_moonshot() -> AgentBuilder<CompletionModel> {
22 |     let client = client();
23 |     client.agent(MOONSHOT_CHAT)
24 | }
25 | 
26 | async fn basic_moonshot() -> Result<(), anyhow::Error> {
27 |     let comedian_agent = partial_agent_moonshot()
28 |         .preamble("You are a comedian here to entertain the user using humour and jokes.")
29 |         .build();
30 | 
31 |     // Prompt the agent and print the response
32 |     let response = comedian_agent.prompt("Entertain me!").await?;
33 |     println!("{}", response);
34 | 
35 |     Ok(())
36 | }
37 | 
38 | async fn context_moonshot() -> Result<(), anyhow::Error> {
39 |     let model = client().completion_model(MOONSHOT_CHAT);
40 | 
41 |     // Create an agent with multiple context documents
42 |     let agent = AgentBuilder::new(model)
43 |         .preamble("Definition of a *glarb-glarb*: A glarb-glarb is an ancient tool used by the ancestors of the inhabitants of planet Jiro to farm the land.")
44 |         .build();
45 | 
46 |     // Prompt the agent and print the response
47 |     let response = agent.prompt("What does \"glarb-glarb\" mean?").await?;
48 | 
49 |     println!("{}", response);
50 | 
51 |     Ok(())
52 | }
53 | 


--------------------------------------------------------------------------------
/rig-core/examples/agent_with_ollama.rs:
--------------------------------------------------------------------------------
 1 | /// This example requires that you have the [`ollama`](https://ollama.com) server running locally.
 2 | use rig::{completion::Prompt, providers};
 3 | 
 4 | #[tokio::main]
 5 | async fn main() -> Result<(), anyhow::Error> {
 6 |     // Create ollama client
 7 |     let client = providers::ollama::Client::new();
 8 | 
 9 |     // Create agent with a single context prompt
10 |     let comedian_agent = client
11 |         .agent("qwen2.5:14b")
12 |         .preamble("You are a comedian here to entertain the user using humour and jokes.")
13 |         .build();
14 | 
15 |     // Prompt the agent and print the response
16 |     let response = comedian_agent.prompt("Entertain me!").await?;
17 |     println!("{}", response);
18 | 
19 |     Ok(())
20 | }
21 | 


--------------------------------------------------------------------------------
/rig-core/examples/agent_with_openrouter.rs:
--------------------------------------------------------------------------------
 1 | use std::env;
 2 | 
 3 | use rig::{completion::Prompt, providers};
 4 | 
 5 | #[tokio::main]
 6 | async fn main() -> Result<(), anyhow::Error> {
 7 |     // Create OpenAI client
 8 |     let client = providers::openrouter::Client::new(
 9 |         &env::var("OPENROUTER_API_KEY").expect("OPENROUTER_API_KEY not set"),
10 |     );
11 | 
12 |     // Create agent with a single context prompt
13 |     let comedian_agent = client
14 |         .agent("cognitivecomputations/dolphin3.0-mistral-24b:free")
15 |         .preamble("You are a comedian here to entertain the user using humour and jokes.")
16 |         .build();
17 | 
18 |     // Prompt the agent and print the response
19 |     let response = comedian_agent.prompt("Entertain me!").await?;
20 |     println!("{}", response);
21 | 
22 |     Ok(())
23 | }
24 | 


--------------------------------------------------------------------------------
/rig-core/examples/anthropic_agent.rs:
--------------------------------------------------------------------------------
 1 | use std::env;
 2 | 
 3 | use rig::{
 4 |     completion::Prompt,
 5 |     providers::anthropic::{self, CLAUDE_3_5_SONNET},
 6 | };
 7 | 
 8 | #[tokio::main]
 9 | async fn main() -> Result<(), anyhow::Error> {
10 |     // Create Anthropic client
11 |     let client = anthropic::ClientBuilder::new(
12 |         &env::var("ANTHROPIC_API_KEY").expect("ANTHROPIC_API_KEY not set"),
13 |     )
14 |     .build();
15 | 
16 |     // Create agent with a single context prompt
17 |     let agent = client
18 |         .agent(CLAUDE_3_5_SONNET)
19 |         .preamble("Be precise and concise.")
20 |         .temperature(0.5)
21 |         .build();
22 | 
23 |     // Prompt the agent and print the response
24 |     let response = agent
25 |         .prompt("When and where and what type is the next solar eclipse?")
26 |         .await?;
27 |     println!("{}", response);
28 | 
29 |     Ok(())
30 | }
31 | 


--------------------------------------------------------------------------------
/rig-core/examples/anthropic_streaming.rs:
--------------------------------------------------------------------------------
 1 | use rig::{
 2 |     providers::anthropic::{self, CLAUDE_3_5_SONNET},
 3 |     streaming::{stream_to_stdout, StreamingPrompt},
 4 | };
 5 | 
 6 | #[tokio::main]
 7 | async fn main() -> Result<(), anyhow::Error> {
 8 |     // Create streaming agent with a single context prompt
 9 |     let agent = anthropic::Client::from_env()
10 |         .agent(CLAUDE_3_5_SONNET)
11 |         .preamble("Be precise and concise.")
12 |         .temperature(0.5)
13 |         .build();
14 | 
15 |     // Stream the response and print chunks as they arrive
16 |     let mut stream = agent
17 |         .stream_prompt("When and where and what type is the next solar eclipse?")
18 |         .await?;
19 | 
20 |     stream_to_stdout(agent, &mut stream).await?;
21 | 
22 |     Ok(())
23 | }
24 | 


--------------------------------------------------------------------------------
https://raw.githubusercontent.com/0xPlaygrounds/rig/88edab96b5466b26330d34af8d8e8af107acf491/rig-core/examples/audio/en-us-natural-speech.mp3


--------------------------------------------------------------------------------
/rig-core/examples/chain.rs:
--------------------------------------------------------------------------------
 1 | use std::env;
 2 | 
 3 | use rig::{
 4 |     embeddings::EmbeddingsBuilder,
 5 |     parallel,
 6 |     pipeline::{self, agent_ops::lookup, passthrough, Op},
 7 |     providers::openai::{Client, TEXT_EMBEDDING_ADA_002},
 8 |     vector_store::in_memory_store::InMemoryVectorStore,
 9 | };
10 | 
11 | #[tokio::main]
12 | async fn main() -> Result<(), anyhow::Error> {
13 |     // Create OpenAI client
14 |     let openai_api_key = env::var("OPENAI_API_KEY").expect("OPENAI_API_KEY not set");
15 |     let openai_client = Client::new(&openai_api_key);
16 | 
17 |     let embedding_model = openai_client.embedding_model(TEXT_EMBEDDING_ADA_002);
18 | 
19 |     // Create embeddings for our documents
20 |     let embeddings = EmbeddingsBuilder::new(embedding_model.clone())
21 |         .document("Definition of a *flurbo*: A flurbo is a green alien that lives on cold planets")?
22 |         .document("Definition of a *glarb-glarb*: A glarb-glarb is a ancient tool used by the ancestors of the inhabitants of planet Jiro to farm the land.")?
23 |         .document("Definition of a *linglingdong*: A term used by inhabitants of the far side of the moon to describe humans.")?
24 |         .build()
25 |         .await?;
26 | 
27 |     // Create vector store with the embeddings
28 |     let vector_store = InMemoryVectorStore::from_documents(embeddings);
29 | 
30 |     // Create vector store index
31 |     let index = vector_store.index(embedding_model);
32 | 
33 |     let agent = openai_client.agent("gpt-4")
34 |         .preamble("
35 |             You are a dictionary assistant here to assist the user in understanding the meaning of words.
36 |         ")
37 |         .build();
38 | 
39 |     let chain = pipeline::new()
40 |         // Chain a parallel operation to the current chain. The parallel operation will
41 |         // perform a lookup operation to retrieve additional context from the user prompt
42 |         // while simultaneously applying a passthrough operation. The latter will allow
43 |         // us to forward the initial prompt to the next operation in the chain.
44 |         .chain(parallel!(
45 |             passthrough(),
46 |             lookup::<_, _, String>(index, 1), // Required to specify document type
47 |         ))
48 |         // Chain a "map" operation to the current chain, which will combine the user
49 |         // prompt with the retrieved context documents to create the final prompt.
50 |         // If an error occurs during the lookup operation, we will log the error and
51 |         // simply return the initial prompt.
52 |         .map(|(prompt, maybe_docs)| match maybe_docs {
53 |             Ok(docs) => format!(
54 |                 "Non standard word definitions:\n{}\n\n{}",
55 |                 docs.into_iter()
56 |                     .map(|(_, _, doc)| doc)
57 |                     .collect::<Vec<_>>()
58 |                     .join("\n"),
59 |                 prompt,
60 |             ),
61 |             Err(err) => {
62 |                 println!("Error: {}! Prompting without additional context", err);
63 |                 format!("{prompt}")
64 |             }
65 |         })
66 |         // Chain a "prompt" operation which will prompt out agent with the final prompt
67 |         .prompt(agent);
68 | 
69 |     // Prompt the agent and print the response
70 |     let response = chain.call("What does \"glarb-glarb\" mean?").await?;
71 | 
72 |     println!("{:?}", response);
73 | 
74 |     Ok(())
75 | }
76 | 


--------------------------------------------------------------------------------
/rig-core/examples/debate.rs:
--------------------------------------------------------------------------------
 1 | use std::env;
 2 | 
 3 | use anyhow::Result;
 4 | use rig::{
 5 |     agent::Agent,
 6 |     completion::Chat,
 7 |     message::Message,
 8 |     providers::{cohere, openai},
 9 | };
10 | 
11 | struct Debater {
12 |     gpt_4: Agent<openai::CompletionModel>,
13 |     coral: Agent<cohere::CompletionModel>,
14 | }
15 | 
16 | impl Debater {
17 |     fn new(position_a: &str, position_b: &str) -> Self {
18 |         tracing_subscriber::fmt()
19 |             .with_max_level(tracing::Level::INFO)
20 |             .with_target(false)
21 |             .init();
22 | 
23 |         let openai_client =
24 |             openai::Client::new(&env::var("OPENAI_API_KEY").expect("OPENAI_API_KEY not set"));
25 |         let cohere_client =
26 |             cohere::Client::new(&env::var("COHERE_API_KEY").expect("COHERE_API_KEY not set"));
27 | 
28 |         Self {
29 |             gpt_4: openai_client.agent("gpt-4").preamble(position_a).build(),
30 |             coral: cohere_client
31 |                 .agent("command-r")
32 |                 .preamble(position_b)
33 |                 .build(),
34 |         }
35 |     }
36 | 
37 |     async fn rounds(&self, n: usize) -> Result<()> {
38 |         let mut history_a: Vec<Message> = vec![];
39 |         let mut history_b: Vec<Message> = vec![];
40 | 
41 |         let mut last_resp_b: Option<String> = None;
42 | 
43 |         for _ in 0..n {
44 |             let prompt_a = if let Some(msg_b) = &last_resp_b {
45 |                 msg_b.clone()
46 |             } else {
47 |                 "Plead your case!".into()
48 |             };
49 | 
50 |             let resp_a = self
51 |                 .gpt_4
52 |                 .chat(prompt_a.as_str(), history_a.clone())
53 |                 .await?;
54 |             println!("GPT-4:\n{}", resp_a);
55 |             history_a.push(Message::user(prompt_a));
56 |             history_a.push(Message::assistant(resp_a.clone()));
57 |             println!("================================================================");
58 | 
59 |             let resp_b = self.coral.chat(resp_a.as_str(), history_b.clone()).await?;
60 |             println!("Coral:\n{}", resp_b);
61 |             println!("================================================================");
62 | 
63 |             history_b.push(Message::user(resp_a));
64 |             history_b.push(Message::assistant(resp_b.clone()));
65 | 
66 |             last_resp_b = Some(resp_b)
67 |         }
68 | 
69 |         Ok(())
70 |     }
71 | }
72 | 
73 | #[tokio::main]
74 | async fn main() -> Result<(), anyhow::Error> {
75 |     // Create model
76 |     let debator = Debater::new(
77 |         "\
78 |         You believe that religion is a useful concept. \
79 |         This could be for security, financial, ethical, philosophical, metaphysical, religious or any kind of other reason. \
80 |         You choose what your arguments are. \
81 |         I will argue against you and you must rebuke me and try to convince me that I am wrong. \
82 |         Make your statements short and concise. \
83 |         ",
84 |         "\
85 |         You believe that religion is a harmful concept. \
86 |         This could be for security, financial, ethical, philosophical, metaphysical, religious or any kind of other reason. \
87 |         You choose what your arguments are. \
88 |         I will argue against you and you must rebuke me and try to convince me that I am wrong. \
89 |         Make your statements short and concise. \
90 |         ",
91 |     );
92 | 
93 |     // Run the debate for 4 rounds
94 |     debator.rounds(4).await?;
95 | 
96 |     Ok(())
97 | }
98 | 


--------------------------------------------------------------------------------
https://raw.githubusercontent.com/0xPlaygrounds/rig/88edab96b5466b26330d34af8d8e8af107acf491/rig-core/examples/documents/deepseek_r1.pdf


--------------------------------------------------------------------------------
/rig-core/examples/extractor.rs:
--------------------------------------------------------------------------------
 1 | use rig::providers::openai;
 2 | use schemars::JsonSchema;
 3 | use serde::{Deserialize, Serialize};
 4 | 
 5 | #[derive(Debug, Deserialize, JsonSchema, Serialize)]
 6 | /// A record representing a person
 7 | struct Person {
 8 |     /// The person's first name, if provided (null otherwise)
 9 |     pub first_name: Option<String>,
10 |     /// The person's last name, if provided (null otherwise)
11 |     pub last_name: Option<String>,
12 |     /// The person's job, if provided (null otherwise)
13 |     pub job: Option<String>,
14 | }
15 | 
16 | #[tokio::main]
17 | async fn main() -> Result<(), anyhow::Error> {
18 |     // Create OpenAI client
19 |     let openai_client = openai::Client::from_env();
20 | 
21 |     // Create extractor
22 |     let data_extractor = openai_client.extractor::<Person>("gpt-4").build();
23 | 
24 |     let person = data_extractor
25 |         .extract("Hello my name is John Doe! I am a software engineer.")
26 |         .await?;
27 | 
28 |     println!("GPT-4: {}", serde_json::to_string_pretty(&person).unwrap());
29 | 
30 |     Ok(())
31 | }
32 | 


--------------------------------------------------------------------------------
/rig-core/examples/extractor_with_deepseek.rs:
--------------------------------------------------------------------------------
 1 | use rig::providers::deepseek;
 2 | use schemars::JsonSchema;
 3 | use serde::{Deserialize, Serialize};
 4 | 
 5 | #[derive(Debug, Deserialize, JsonSchema, Serialize)]
 6 | /// A record representing a person
 7 | struct Person {
 8 |     /// The person's first name, if provided (null otherwise)
 9 |     pub first_name: Option<String>,
10 |     /// The person's last name, if provided (null otherwise)
11 |     pub last_name: Option<String>,
12 |     /// The person's job, if provided (null otherwise)
13 |     pub job: Option<String>,
14 | }
15 | 
16 | #[tokio::main]
17 | async fn main() -> Result<(), anyhow::Error> {
18 |     // Create DeepSeek client
19 |     let deepseek_client = deepseek::Client::from_env();
20 | 
21 |     // Create extractor
22 |     let data_extractor = deepseek_client
23 |         .extractor::<Person>(deepseek::DEEPSEEK_CHAT)
24 |         .build();
25 | 
26 |     let person = data_extractor
27 |         .extract("Hello my name is John Doe! I am a software engineer.")
28 |         .await?;
29 | 
30 |     println!(
31 |         "DeepSeek: {}",
32 |         serde_json::to_string_pretty(&person).unwrap()
33 |     );
34 | 
35 |     Ok(())
36 | }
37 | 


--------------------------------------------------------------------------------
/rig-core/examples/gemini_agent.rs:
--------------------------------------------------------------------------------
 1 | use rig::{
 2 |     completion::Prompt,
 3 |     providers::gemini::{self, completion::gemini_api_types::GenerationConfig},
 4 | };
 5 | #[tracing::instrument(ret)]
 6 | #[tokio::main]
 7 | 
 8 | async fn main() -> Result<(), anyhow::Error> {
 9 |     tracing_subscriber::fmt()
10 |         .with_max_level(tracing::Level::DEBUG)
11 |         .with_target(false)
12 |         .init();
13 | 
14 |     // Initialize the Google Gemini client
15 |     let client = gemini::Client::from_env();
16 | 
17 |     // Create agent with a single context prompt
18 |     let agent = client
19 |         .agent(gemini::completion::GEMINI_1_5_PRO)
20 |         .preamble("Be creative and concise. Answer directly and clearly.")
21 |         .temperature(0.5)
22 |         // The `GenerationConfig` utility struct helps construct a typesafe `additional_params`
23 |         .additional_params(serde_json::to_value(GenerationConfig {
24 |             top_k: Some(1),
25 |             top_p: Some(0.95),
26 |             candidate_count: Some(1),
27 |             ..Default::default()
28 |         })?) // Unwrap the Result to get the Value
29 |         .build();
30 | 
31 |     tracing::info!("Prompting the agent...");
32 | 
33 |     // Prompt the agent and print the response
34 |     let response = agent
35 |         .prompt("How much wood would a woodchuck chuck if a woodchuck could chuck wood? Infer an answer.")
36 |         .await;
37 | 
38 |     tracing::info!("Response: {:?}", response);
39 | 
40 |     match response {
41 |         Ok(response) => println!("{}", response),
42 |         Err(e) => {
43 |             tracing::error!("Error: {:?}", e);
44 |             return Err(e.into());
45 |         }
46 |     }
47 | 
48 |     Ok(())
49 | }
50 | 


--------------------------------------------------------------------------------
/rig-core/examples/gemini_embeddings.rs:
--------------------------------------------------------------------------------
 1 | use rig::providers::gemini;
 2 | use rig::Embed;
 3 | 
 4 | #[derive(Embed, Debug)]
 5 | struct Greetings {
 6 |     #[embed]
 7 |     message: String,
 8 | }
 9 | 
10 | #[tokio::main]
11 | async fn main() -> Result<(), anyhow::Error> {
12 |     // Initialize the Google Gemini client
13 |     // Create OpenAI client
14 |     let client = gemini::Client::from_env();
15 | 
16 |     let embeddings = client
17 |         .embeddings(gemini::embedding::EMBEDDING_001)
18 |         .document(Greetings {
19 |             message: "Hello, world!".to_string(),
20 |         })?
21 |         .document(Greetings {
22 |             message: "Goodbye, world!".to_string(),
23 |         })?
24 |         .build()
25 |         .await
26 |         .expect("Failed to embed documents");
27 | 
28 |     println!("{:?}", embeddings);
29 | 
30 |     Ok(())
31 | }
32 | 


--------------------------------------------------------------------------------
/rig-core/examples/gemini_extractor.rs:
--------------------------------------------------------------------------------
 1 | use rig::providers::gemini;
 2 | use schemars::JsonSchema;
 3 | use serde::{Deserialize, Serialize};
 4 | 
 5 | #[derive(Debug, Deserialize, JsonSchema, Serialize)]
 6 | /// A record representing a person
 7 | struct Person {
 8 |     /// The person's first name, if provided (null otherwise)
 9 |     pub first_name: Option<String>,
10 |     /// The person's last name, if provided (null otherwise)
11 |     pub last_name: Option<String>,
12 |     /// The person's job, if provided (null otherwise)
13 |     pub job: Option<String>,
14 | }
15 | 
16 | #[tokio::main]
17 | async fn main() -> Result<(), anyhow::Error> {
18 |     tracing_subscriber::fmt()
19 |         .with_max_level(tracing::Level::DEBUG)
20 |         .with_target(false)
21 |         .init();
22 | 
23 |     // Create Gemini client
24 |     let client = gemini::Client::from_env();
25 | 
26 |     // Create extractor
27 |     let data_extractor = client
28 |         .extractor::<Person>(gemini::completion::GEMINI_2_0_FLASH)
29 |         .build();
30 | 
31 |     let person = data_extractor
32 |         .extract("Hello my name is John Doe! I am a software engineer.")
33 |         .await?;
34 | 
35 |     println!("GEMINI: {}", serde_json::to_string_pretty(&person).unwrap());
36 | 
37 |     Ok(())
38 | }
39 | 


--------------------------------------------------------------------------------
/rig-core/examples/gemini_streaming.rs:
--------------------------------------------------------------------------------
 1 | use rig::{
 2 |     providers::gemini::{self, completion::GEMINI_1_5_FLASH},
 3 |     streaming::{stream_to_stdout, StreamingPrompt},
 4 | };
 5 | 
 6 | #[tokio::main]
 7 | async fn main() -> Result<(), anyhow::Error> {
 8 |     // Create streaming agent with a single context prompt
 9 |     let agent = gemini::Client::from_env()
10 |         .agent(GEMINI_1_5_FLASH)
11 |         .preamble("Be precise and concise.")
12 |         .temperature(0.5)
13 |         .build();
14 | 
15 |     // Stream the response and print chunks as they arrive
16 |     let mut stream = agent
17 |         .stream_prompt("When and where and what type is the next solar eclipse?")
18 |         .await?;
19 | 
20 |     stream_to_stdout(agent, &mut stream).await?;
21 | 
22 |     Ok(())
23 | }
24 | 


--------------------------------------------------------------------------------
/rig-core/examples/huggingface_image_generation.rs:
--------------------------------------------------------------------------------
 1 | use rig::image_generation::ImageGenerationModel;
 2 | use rig::providers::huggingface;
 3 | use std::env::args;
 4 | use std::fs::File;
 5 | use std::io::Write;
 6 | use std::path::Path;
 7 | 
 8 | const DEFAULT_PATH: &str = "./output.png";
 9 | 
10 | #[tokio::main]
11 | async fn main() {
12 |     let arguments: Vec<String> = args().collect();
13 | 
14 |     let path = if arguments.len() > 1 {
15 |         arguments[1].clone()
16 |     } else {
17 |         DEFAULT_PATH.to_string()
18 |     };
19 | 
20 |     let path = Path::new(&path);
21 | 
22 |     let mut file = File::create_new(path).expect("Failed to create file");
23 | 
24 |     let huggingface = huggingface::Client::from_env();
25 | 
26 |     let dalle = huggingface.image_generation_model(huggingface::STABLE_DIFFUSION_3);
27 | 
28 |     let response = dalle
29 |         .image_generation_request()
30 |         .prompt("A castle sitting upon a large mountain, overlooking the water.")
31 |         .width(1024)
32 |         .height(1024)
33 |         .send()
34 |         .await
35 |         .expect("Failed to generate image");
36 | 
37 |     let _ = file.write(&response.image);
38 | }
39 | 


--------------------------------------------------------------------------------
/rig-core/examples/huggingface_streaming.rs:
--------------------------------------------------------------------------------
 1 | use std::env;
 2 | 
 3 | use rig::{
 4 |     providers::huggingface::{self},
 5 |     streaming::{stream_to_stdout, StreamingPrompt},
 6 | };
 7 | 
 8 | #[tokio::main]
 9 | async fn main() -> Result<(), anyhow::Error> {
10 |     // Create streaming agent with a single context prompt
11 |     let api_key = &env::var("HUGGINGFACE_API_KEY").expect("HUGGINGFACE_API_KEY not set");
12 | 
13 |     println!("\n\nRunning Llama 3.1\n\n");
14 |     hf_inference(api_key).await?;
15 | 
16 |     println!("\n\nRunning Deepseek R-1\n\n");
17 |     together(api_key).await?;
18 | 
19 |     Ok(())
20 | }
21 | 
22 | async fn hf_inference(api_key: &str) -> Result<(), anyhow::Error> {
23 |     let agent = huggingface::ClientBuilder::new(api_key)
24 |         .build()
25 |         .agent("meta-llama/Llama-3.1-8B-Instruct")
26 |         .preamble("Be precise and concise.")
27 |         .temperature(0.5)
28 |         .build();
29 | 
30 |     // Stream the response and print chunks as they arrive
31 |     let mut stream = agent
32 |         .stream_prompt("When and where and what type is the next solar eclipse?")
33 |         .await?;
34 | 
35 |     stream_to_stdout(agent, &mut stream).await?;
36 | 
37 |     Ok(())
38 | }
39 | 
40 | async fn together(api_key: &str) -> Result<(), anyhow::Error> {
41 |     let agent = huggingface::ClientBuilder::new(api_key)
42 |         .sub_provider(huggingface::SubProvider::Together)
43 |         .build()
44 |         .agent("deepseek-ai/DeepSeek-R1")
45 |         .preamble("Be precise and concise.")
46 |         .temperature(0.5)
47 |         .build();
48 | 
49 |     // Stream the response and print chunks as they arrive
50 |     let mut stream = agent
51 |         .stream_prompt("When and where and what type is the next solar eclipse?")
52 |         .await?;
53 | 
54 |     stream_to_stdout(agent, &mut stream).await?;
55 | 
56 |     Ok(())
57 | }
58 | 


--------------------------------------------------------------------------------
/rig-core/examples/hyperbolic_audio_generation.rs:
--------------------------------------------------------------------------------
 1 | use rig::audio_generation::AudioGenerationModel;
 2 | use rig::providers::hyperbolic;
 3 | use std::env::args;
 4 | use std::fs::File;
 5 | use std::io::Write;
 6 | use std::path::Path;
 7 | 
 8 | const DEFAULT_PATH: &str = "./output.mp3";
 9 | 
10 | #[tokio::main]
11 | async fn main() {
12 |     let arguments: Vec<String> = args().collect();
13 | 
14 |     let path = if arguments.len() > 1 {
15 |         arguments[1].clone()
16 |     } else {
17 |         DEFAULT_PATH.to_string()
18 |     };
19 | 
20 |     let path = Path::new(&path);
21 |     let mut file = File::create_new(path).expect("Failed to create file");
22 | 
23 |     let hyperbolic = hyperbolic::Client::from_env();
24 | 
25 |     let tts = hyperbolic.audio_generation_model("EN");
26 | 
27 |     let response = tts
28 |         .audio_generation_request()
29 |         .text("The quick brown fox jumps over the lazy dog")
30 |         .voice("EN-US")
31 |         .send()
32 |         .await
33 |         .expect("Failed to generate image");
34 | 
35 |     let _ = file.write(&response.audio);
36 | }
37 | 


--------------------------------------------------------------------------------
/rig-core/examples/hyperbolic_image_generation.rs:
--------------------------------------------------------------------------------
 1 | use rig::image_generation::ImageGenerationModel;
 2 | use rig::providers::hyperbolic;
 3 | use std::env::args;
 4 | use std::fs::File;
 5 | use std::io::Write;
 6 | use std::path::Path;
 7 | 
 8 | const DEFAULT_PATH: &str = "./output.png";
 9 | 
10 | #[tokio::main]
11 | async fn main() {
12 |     let arguments: Vec<String> = args().collect();
13 | 
14 |     let path = if arguments.len() > 1 {
15 |         arguments[1].clone()
16 |     } else {
17 |         DEFAULT_PATH.to_string()
18 |     };
19 | 
20 |     let path = Path::new(&path);
21 |     let mut file = File::create_new(path).expect("Failed to create file");
22 | 
23 |     let hyperbolic = hyperbolic::Client::from_env();
24 | 
25 |     let stable_diffusion = hyperbolic.image_generation_model(hyperbolic::SDXL_TURBO);
26 | 
27 |     let response = stable_diffusion
28 |         .image_generation_request()
29 |         .prompt("A castle sitting upon a large mountain, overlooking the water.")
30 |         .width(1024)
31 |         .height(1024)
32 |         .send()
33 |         .await
34 |         .expect("Failed to generate image");
35 | 
36 |     let _ = file.write(&response.image);
37 | }
38 | 


--------------------------------------------------------------------------------
/rig-core/examples/image.rs:
--------------------------------------------------------------------------------
 1 | use reqwest::Client;
 2 | 
 3 | use rig::{
 4 |     completion::{message::Image, Prompt},
 5 |     message::{ContentFormat, ImageMediaType},
 6 |     providers::anthropic::{self, CLAUDE_3_5_SONNET},
 7 | };
 8 | 
 9 | use base64::{prelude::BASE64_STANDARD, Engine};
10 | 
11 | const IMAGE_URL: &str =
12 |     "https://upload.wikimedia.org/wikipedia/commons/a/a7/Camponotus_flavomarginatus_ant.jpg";
13 | 
14 | #[tokio::main]
15 | async fn main() -> Result<(), anyhow::Error> {
16 |     // Tracing
17 |     tracing_subscriber::fmt()
18 |         .with_max_level(tracing::Level::DEBUG)
19 |         .with_target(false)
20 |         .init();
21 | 
22 |     // Create Anthropic client
23 |     let client = anthropic::Client::from_env();
24 | 
25 |     // Create agent with a single context prompt
26 |     let agent = client
27 |         .agent(CLAUDE_3_5_SONNET)
28 |         .preamble("You are an image describer.")
29 |         .temperature(0.5)
30 |         .build();
31 | 
32 |     // Grab image and convert to base64
33 |     let reqwest_client = Client::new();
34 |     let image_bytes = reqwest_client.get(IMAGE_URL).send().await?.bytes().await?;
35 |     let image_base64 = BASE64_STANDARD.encode(image_bytes);
36 | 
37 |     // Compose `Image` for prompt
38 |     let image = Image {
39 |         data: image_base64,
40 |         media_type: Some(ImageMediaType::JPEG),
41 |         format: Some(ContentFormat::Base64),
42 |         ..Default::default()
43 |     };
44 | 
45 |     // Prompt the agent and print the response
46 |     let response = agent.prompt(image).await?;
47 |     println!("{}", response);
48 | 
49 |     Ok(())
50 | }
51 | 


--------------------------------------------------------------------------------
/rig-core/examples/image_ollama.rs:
--------------------------------------------------------------------------------
 1 | use rig::{
 2 |     completion::{message::Image, Prompt},
 3 |     message::{ContentFormat, ImageMediaType},
 4 | };
 5 | 
 6 | use base64::{prelude::BASE64_STANDARD, Engine};
 7 | use rig::providers::ollama;
 8 | use tokio::fs;
 9 | 
10 | const IMAGE_FILE_PATH: &str = "rig-core/examples/images/camponotus_flavomarginatus_ant.jpg";
11 | 
12 | #[tokio::main]
13 | async fn main() -> Result<(), anyhow::Error> {
14 |     // Tracing
15 |     tracing_subscriber::fmt()
16 |         .with_max_level(tracing::Level::DEBUG)
17 |         .with_target(false)
18 |         .init();
19 | 
20 |     // Create ollama client
21 |     let client = ollama::Client::new();
22 | 
23 |     // Create agent with a single context prompt
24 |     let agent = client
25 |         .agent("llava")
26 |         .preamble("describe this image and make sure to include anything notable about it (include text you see in the image)")
27 |         .temperature(0.5)
28 |         .build();
29 | 
30 |     // Read image and convert to base64
31 |     let image_bytes = fs::read(IMAGE_FILE_PATH).await?;
32 |     let image_base64 = BASE64_STANDARD.encode(image_bytes);
33 | 
34 |     // Compose `Image` for prompt
35 |     let image = Image {
36 |         data: image_base64,
37 |         media_type: Some(ImageMediaType::JPEG),
38 |         format: Some(ContentFormat::Base64),
39 |         ..Default::default()
40 |     };
41 | 
42 |     // Prompt the agent and print the response
43 |     let response = agent.prompt(image).await?;
44 |     println!("{}", response);
45 |     Ok(())
46 | }
47 | 


--------------------------------------------------------------------------------
https://raw.githubusercontent.com/0xPlaygrounds/rig/88edab96b5466b26330d34af8d8e8af107acf491/rig-core/examples/images/camponotus_flavomarginatus_ant.jpg


--------------------------------------------------------------------------------
/rig-core/examples/loaders.rs:
--------------------------------------------------------------------------------
 1 | use rig::loaders::FileLoader;
 2 | 
 3 | #[tokio::main]
 4 | async fn main() -> Result<(), anyhow::Error> {
 5 |     FileLoader::with_glob("cargo.toml")?
 6 |         .read()
 7 |         .into_iter()
 8 |         .for_each(|result| match result {
 9 |             Ok(content) => println!("{}", content),
10 |             Err(e) => eprintln!("Error reading file: {}", e),
11 |         });
12 | 
13 |     Ok(())
14 | }
15 | 


--------------------------------------------------------------------------------
/rig-core/examples/mcp_tool.rs:
--------------------------------------------------------------------------------
 1 | use anyhow::Result;
 2 | use mcp_core::{
 3 |     client::ClientBuilder,
 4 |     server::Server,
 5 |     tool_text_content,
 6 |     transport::{ClientSseTransportBuilder, ServerSseTransport},
 7 |     types::{ClientCapabilities, Implementation, ServerCapabilities, ToolResponseContent},
 8 | };
 9 | use mcp_core_macros::tool;
10 | use rig::{
11 |     completion::Prompt,
12 |     providers::{self},
13 | };
14 | use serde_json::json;
15 | 
16 | #[tool(
17 |     name = "Add",
18 |     description = "Adds two numbers together.",
19 |     params(a = "The first number to add", b = "The second number to add")
20 | )]
21 | async fn add_tool(a: f64, b: f64) -> Result<ToolResponseContent> {
22 |     Ok(tool_text_content!((a + b).to_string()))
23 | }
24 | 
25 | #[tokio::main]
26 | async fn main() -> Result<(), anyhow::Error> {
27 |     tracing_subscriber::fmt().init();
28 | 
29 |     // Create the MCP server
30 |     let mcp_server_protocol = Server::builder("add".to_string(), "1.0".to_string())
31 |         .capabilities(ServerCapabilities {
32 |             tools: Some(json!({
33 |                 "listChanged": false,
34 |             })),
35 |             ..Default::default()
36 |         })
37 |         .register_tool(AddTool::tool(), AddTool::call())
38 |         .build();
39 |     let mcp_server_transport =
40 |         ServerSseTransport::new("127.0.0.1".to_string(), 3000, mcp_server_protocol);
41 |     tokio::spawn(async move { Server::start(mcp_server_transport).await });
42 | 
43 |     // Create the MCP client
44 |     let mcp_client = ClientBuilder::new(
45 |         ClientSseTransportBuilder::new("http://127.0.0.1:3000/sse".to_string()).build(),
46 |     )
47 |     .build();
48 |     // Start the MCP client
49 |     mcp_client.open().await?;
50 | 
51 |     let init_res = mcp_client
52 |         .initialize(
53 |             Implementation {
54 |                 name: "mcp-client".to_string(),
55 |                 version: "0.1.0".to_string(),
56 |             },
57 |             ClientCapabilities::default(),
58 |         )
59 |         .await?;
60 |     println!("Initialized: {:?}", init_res);
61 | 
62 |     let tools_list_res = mcp_client.list_tools(None, None).await?;
63 |     println!("Tools: {:?}", tools_list_res);
64 | 
65 |     tracing::info!("Building RIG agent");
66 |     let completion_model = providers::openai::Client::from_env();
67 |     let mut agent_builder = completion_model.agent("gpt-4o");
68 | 
69 |     // Add MCP tools to the agent
70 |     agent_builder = tools_list_res
71 |         .tools
72 |         .into_iter()
73 |         .fold(agent_builder, |builder, tool| {
74 |             builder.mcp_tool(tool, mcp_client.clone().into())
75 |         });
76 |     let agent = agent_builder.build();
77 | 
78 |     tracing::info!("Prompting RIG agent");
79 |     let response = agent.prompt("Add 10 + 10").await?;
80 |     tracing::info!("Agent response: {:?}", response);
81 | 
82 |     Ok(())
83 | }
84 | 


--------------------------------------------------------------------------------
/rig-core/examples/multi_agent.rs:
--------------------------------------------------------------------------------
 1 | use std::env;
 2 | 
 3 | use rig::{
 4 |     agent::{Agent, AgentBuilder},
 5 |     cli_chatbot::cli_chatbot,
 6 |     completion::{Chat, CompletionModel, PromptError},
 7 |     message::Message,
 8 |     providers::openai::Client as OpenAIClient,
 9 | };
10 | 
11 | /// Represents a multi agent application that consists of two components:
12 | /// an agent specialized in translating prompt into english and a simple GPT-4 model.
13 | /// When prompted, the application will use the translator agent to translate the
14 | /// prompt in english, before answering it with GPT-4. The answer in english is returned.
15 | struct EnglishTranslator<M: CompletionModel> {
16 |     translator_agent: Agent<M>,
17 |     gpt4: Agent<M>,
18 | }
19 | 
20 | impl<M: CompletionModel> EnglishTranslator<M> {
21 |     fn new(model: M) -> Self {
22 |         Self {
23 |             // Create the translator agent
24 |             translator_agent: AgentBuilder::new(model.clone())
25 |                 .preamble("\
26 |                     You are a translator assistant that will translate any input text into english. \
27 |                     If the text is already in english, simply respond with the original text but fix any mistakes (grammar, syntax, etc.). \
28 |                 ")
29 |                 .build(),
30 | 
31 |             // Create the GPT4 model
32 |             gpt4: AgentBuilder::new(model).build()
33 |         }
34 |     }
35 | }
36 | 
37 | impl<M: CompletionModel> Chat for EnglishTranslator<M> {
38 |     async fn chat(
39 |         &self,
40 |         prompt: impl Into<Message> + Send,
41 |         chat_history: Vec<Message>,
42 |     ) -> Result<String, PromptError> {
43 |         // Translate the prompt using the translator agent
44 |         let translated_prompt = self
45 |             .translator_agent
46 |             .chat(prompt, chat_history.clone())
47 |             .await?;
48 | 
49 |         println!("Translated prompt: {}", translated_prompt);
50 | 
51 |         // Answer the prompt using gpt4
52 |         self.gpt4
53 |             .chat(translated_prompt.as_str(), chat_history)
54 |             .await
55 |     }
56 | }
57 | 
58 | #[tokio::main]
59 | async fn main() -> Result<(), anyhow::Error> {
60 |     // Create OpenAI client
61 |     let openai_api_key = env::var("OPENAI_API_KEY").expect("OPENAI_API_KEY not set");
62 |     let openai_client = OpenAIClient::new(&openai_api_key);
63 |     let model = openai_client.completion_model("gpt-4");
64 | 
65 |     // Create OpenAI client
66 |     // let cohere_api_key = env::var("COHERE_API_KEY").expect("COHERE_API_KEY not set");
67 |     // let cohere_client = CohereClient::new(&cohere_api_key);
68 |     // let model = cohere_client.completion_model("command-r");
69 | 
70 |     // Create model
71 |     let translator = EnglishTranslator::new(model);
72 | 
73 |     // Spin up a chatbot using the agent
74 |     cli_chatbot(translator).await?;
75 | 
76 |     Ok(())
77 | }
78 | 


--------------------------------------------------------------------------------
/rig-core/examples/multi_extract.rs:
--------------------------------------------------------------------------------
 1 | use rig::{
 2 |     pipeline::{self, agent_ops, TryOp},
 3 |     providers::openai,
 4 |     try_parallel,
 5 | };
 6 | use schemars::JsonSchema;
 7 | use serde::{Deserialize, Serialize};
 8 | 
 9 | #[derive(Debug, Deserialize, JsonSchema, Serialize)]
10 | /// A record containing extracted names
11 | pub struct Names {
12 |     /// The names extracted from the text
13 |     pub names: Vec<String>,
14 | }
15 | 
16 | #[derive(Debug, Deserialize, JsonSchema, Serialize)]
17 | /// A record containing extracted topics
18 | pub struct Topics {
19 |     /// The topics extracted from the text
20 |     pub topics: Vec<String>,
21 | }
22 | 
23 | #[derive(Debug, Deserialize, JsonSchema, Serialize)]
24 | /// A record containing extracted sentiment
25 | pub struct Sentiment {
26 |     /// The sentiment of the text (-1 being negative, 1 being positive)
27 |     pub sentiment: f64,
28 |     /// The confidence of the sentiment
29 |     pub confidence: f64,
30 | }
31 | 
32 | #[tokio::main]
33 | async fn main() -> anyhow::Result<()> {
34 |     let openai = openai::Client::from_env();
35 | 
36 |     let names_extractor = openai
37 |         .extractor::<Names>("gpt-4")
38 |         .preamble("Extract names (e.g.: of people, places) from the given text.")
39 |         .build();
40 | 
41 |     let topics_extractor = openai
42 |         .extractor::<Topics>("gpt-4")
43 |         .preamble("Extract topics from the given text.")
44 |         .build();
45 | 
46 |     let sentiment_extractor = openai
47 |         .extractor::<Sentiment>("gpt-4")
48 |         .preamble(
49 |             "Extract sentiment (and how confident you are of the sentiment) from the given text.",
50 |         )
51 |         .build();
52 | 
53 |     // Create a chain that extracts names, topics, and sentiment from a given text
54 |     // using three different GPT-4 based extractors.
55 |     // The chain will output a formatted string containing the extracted information.
56 |     let chain = pipeline::new()
57 |         .chain(try_parallel!(
58 |             agent_ops::extract(names_extractor),
59 |             agent_ops::extract(topics_extractor),
60 |             agent_ops::extract(sentiment_extractor),
61 |         ))
62 |         .map_ok(|(names, topics, sentiment)| {
63 |             format!(
64 |                 "Extracted names: {names}\nExtracted topics: {topics}\nExtracted sentiment: {sentiment}",
65 |                 names = names.names.join(", "),
66 |                 topics = topics.topics.join(", "),
67 |                 sentiment = sentiment.sentiment,
68 |             )
69 |         });
70 | 
71 |     // Batch call the chain with up to 4 inputs concurrently
72 |     let response = chain
73 |         .try_batch_call(
74 |             4,
75 |             vec![
76 |                 "Screw you Putin!",
77 |                 "I love my dog, but I hate my cat.",
78 |                 "I'm going to the store to buy some milk.",
79 |             ],
80 |         )
81 |         .await?;
82 | 
83 |     for response in response {
84 |         println!("Text analysis:\n{response}");
85 |     }
86 | 
87 |     Ok(())
88 | }
89 | 


--------------------------------------------------------------------------------
/rig-core/examples/ollama_streaming.rs:
--------------------------------------------------------------------------------
 1 | use rig::providers::ollama;
 2 | use rig::streaming::{stream_to_stdout, StreamingPrompt};
 3 | 
 4 | #[tokio::main]
 5 | async fn main() -> Result<(), anyhow::Error> {
 6 |     // Create streaming agent with a single context prompt
 7 |     let agent = ollama::Client::new()
 8 |         .agent("llama3.2")
 9 |         .preamble("Be precise and concise.")
10 |         .temperature(0.5)
11 |         .build();
12 | 
13 |     // Stream the response and print chunks as they arrive
14 |     let mut stream = agent
15 |         .stream_prompt("When and where and what type is the next solar eclipse?")
16 |         .await?;
17 | 
18 |     stream_to_stdout(agent, &mut stream).await?;
19 | 
20 |     Ok(())
21 | }
22 | 


--------------------------------------------------------------------------------
/rig-core/examples/openai_audio_generation.rs:
--------------------------------------------------------------------------------
 1 | use rig::audio_generation::AudioGenerationModel;
 2 | use rig::providers::openai;
 3 | use std::env::args;
 4 | use std::fs::File;
 5 | use std::io::Write;
 6 | use std::path::Path;
 7 | 
 8 | const DEFAULT_PATH: &str = "./output.mp3";
 9 | 
10 | #[tokio::main]
11 | async fn main() {
12 |     let arguments: Vec<String> = args().collect();
13 | 
14 |     let path = if arguments.len() > 1 {
15 |         arguments[1].clone()
16 |     } else {
17 |         DEFAULT_PATH.to_string()
18 |     };
19 | 
20 |     let path = Path::new(&path);
21 |     let mut file = File::create_new(path).expect("Failed to create file");
22 | 
23 |     let openai = openai::Client::from_env();
24 | 
25 |     let tts = openai.audio_generation_model(openai::TTS_1);
26 | 
27 |     let response = tts
28 |         .audio_generation_request()
29 |         .text("The quick brown fox jumps over the lazy dog")
30 |         .voice("alloy")
31 |         .send()
32 |         .await
33 |         .expect("Failed to generate image");
34 | 
35 |     let _ = file.write(&response.audio);
36 | }
37 | 


--------------------------------------------------------------------------------
/rig-core/examples/openai_image_generation.rs:
--------------------------------------------------------------------------------
 1 | use rig::image_generation::ImageGenerationModel;
 2 | use rig::providers::openai;
 3 | use std::env::args;
 4 | use std::fs::File;
 5 | use std::io::Write;
 6 | use std::path::Path;
 7 | 
 8 | const DEFAULT_PATH: &str = "./output.png";
 9 | 
10 | #[tokio::main]
11 | async fn main() {
12 |     let arguments: Vec<String> = args().collect();
13 | 
14 |     let path = if arguments.len() > 1 {
15 |         arguments[1].clone()
16 |     } else {
17 |         DEFAULT_PATH.to_string()
18 |     };
19 | 
20 |     let path = Path::new(&path);
21 |     let mut file = File::create_new(path).expect("Failed to create file");
22 | 
23 |     let openai = openai::Client::from_env();
24 | 
25 |     let dalle = openai.image_generation_model(openai::DALL_E_2);
26 | 
27 |     let response = dalle
28 |         .image_generation_request()
29 |         .prompt("A castle sitting upon a large mountain, overlooking the water.")
30 |         .width(1024)
31 |         .height(1024)
32 |         .send()
33 |         .await
34 |         .expect("Failed to generate image");
35 | 
36 |     let _ = file.write(&response.image);
37 | }
38 | 


--------------------------------------------------------------------------------
/rig-core/examples/openai_streaming.rs:
--------------------------------------------------------------------------------
 1 | use rig::providers::openai;
 2 | use rig::streaming::{stream_to_stdout, StreamingPrompt};
 3 | 
 4 | #[tokio::main]
 5 | async fn main() -> Result<(), anyhow::Error> {
 6 |     // Create streaming agent with a single context prompt
 7 |     let agent = openai::Client::from_env()
 8 |         .agent(openai::GPT_4O)
 9 |         .preamble("Be precise and concise.")
10 |         .temperature(0.5)
11 |         .build();
12 | 
13 |     // Stream the response and print chunks as they arrive
14 |     let mut stream = agent
15 |         .stream_prompt("When and where and what type is the next solar eclipse?")
16 |         .await?;
17 | 
18 |     stream_to_stdout(agent, &mut stream).await?;
19 | 
20 |     Ok(())
21 | }
22 | 


--------------------------------------------------------------------------------
/rig-core/examples/perplexity_agent.rs:
--------------------------------------------------------------------------------
 1 | use std::env;
 2 | 
 3 | use rig::{
 4 |     completion::Prompt,
 5 |     providers::{self, perplexity::SONAR},
 6 | };
 7 | use serde_json::json;
 8 | 
 9 | #[tokio::main]
10 | async fn main() -> Result<(), anyhow::Error> {
11 |     // Create OpenAI client
12 |     let client = providers::perplexity::Client::new(
13 |         &env::var("PERPLEXITY_API_KEY").expect("PERPLEXITY_API_KEY not set"),
14 |     );
15 | 
16 |     // Create agent with a single context prompt
17 |     let agent = client
18 |         .agent(SONAR)
19 |         .preamble("Be precise and concise.")
20 |         .temperature(0.5)
21 |         .additional_params(json!({
22 |             "return_related_questions": true,
23 |             "return_images": true
24 |         }))
25 |         .build();
26 | 
27 |     // Prompt the agent and print the response
28 |     let response = agent
29 |         .prompt("When and where and what type is the next solar eclipse?")
30 |         .await?;
31 |     println!("{}", response);
32 | 
33 |     Ok(())
34 | }
35 | 


--------------------------------------------------------------------------------
/rig-core/examples/sentiment_classifier.rs:
--------------------------------------------------------------------------------
 1 | use rig::providers::openai;
 2 | use schemars::JsonSchema;
 3 | use serde::{Deserialize, Serialize};
 4 | 
 5 | #[derive(Debug, Deserialize, JsonSchema, Serialize)]
 6 | /// An enum representing the sentiment of a document
 7 | enum Sentiment {
 8 |     Positive,
 9 |     Negative,
10 |     Neutral,
11 | }
12 | 
13 | #[derive(Debug, Deserialize, JsonSchema, Serialize)]
14 | struct DocumentSentiment {
15 |     /// The sentiment of the document
16 |     sentiment: Sentiment,
17 | }
18 | 
19 | #[tokio::main]
20 | async fn main() {
21 |     // Create OpenAI client
22 |     let openai_client = openai::Client::from_env();
23 | 
24 |     // Create extractor
25 |     let data_extractor = openai_client
26 |         .extractor::<DocumentSentiment>("gpt-4")
27 |         .build();
28 | 
29 |     let sentiment = data_extractor
30 |         .extract("I am happy")
31 |         .await
32 |         .expect("Failed to extract sentiment");
33 | 
34 |     println!("GPT-4: {:?}", sentiment);
35 | }
36 | 


--------------------------------------------------------------------------------
/rig-core/examples/simple_model.rs:
--------------------------------------------------------------------------------
 1 | use rig::{completion::Prompt, providers::openai};
 2 | 
 3 | #[tokio::main]
 4 | async fn main() {
 5 |     // Create OpenAI client and model
 6 |     let openai_client = openai::Client::from_env();
 7 | 
 8 |     let gpt4 = openai_client.agent("gpt-4").build();
 9 | 
10 |     // Prompt the model and print its response
11 |     let response = gpt4
12 |         .prompt("Who are you?")
13 |         .await
14 |         .expect("Failed to prompt GPT-4");
15 | 
16 |     println!("GPT-4: {response}");
17 | }
18 | 


--------------------------------------------------------------------------------
/rig-core/examples/together_embeddings.rs:
--------------------------------------------------------------------------------
 1 | use rig::providers::together;
 2 | use rig::Embed;
 3 | 
 4 | #[derive(Embed, Debug)]
 5 | struct Greetings {
 6 |     #[embed]
 7 |     message: String,
 8 | }
 9 | 
10 | #[tokio::main]
11 | async fn main() -> Result<(), anyhow::Error> {
12 |     // Initialize the together client
13 |     let client = together::Client::from_env();
14 | 
15 |     let embeddings = client
16 |         .embeddings(together::embedding::M2_BERT_80M_8K_RETRIEVAL)
17 |         .document(Greetings {
18 |             message: "Hello, world!".to_string(),
19 |         })?
20 |         .document(Greetings {
21 |             message: "Goodbye, world!".to_string(),
22 |         })?
23 |         .build()
24 |         .await
25 |         .expect("Failed to embed documents");
26 | 
27 |     println!("{:?}", embeddings);
28 | 
29 |     Ok(())
30 | }
31 | 


--------------------------------------------------------------------------------
/rig-core/examples/together_streaming.rs:
--------------------------------------------------------------------------------
 1 | use rig::{
 2 |     providers::together::{self},
 3 |     streaming::{stream_to_stdout, StreamingPrompt},
 4 | };
 5 | 
 6 | #[tokio::main]
 7 | async fn main() -> Result<(), anyhow::Error> {
 8 |     // Create streaming agent with a single context prompt
 9 |     let agent = together::Client::from_env()
10 |         .agent(together::LLAMA_3_8B_CHAT_HF)
11 |         .preamble("Be precise and concise.")
12 |         .temperature(0.5)
13 |         .build();
14 | 
15 |     // Stream the response and print chunks as they arrive
16 |     let mut stream = agent
17 |         .stream_prompt("When and where and what type is the next solar eclipse?")
18 |         .await?;
19 | 
20 |     stream_to_stdout(agent, &mut stream).await?;
21 | 
22 |     Ok(())
23 | }
24 | 


--------------------------------------------------------------------------------
/rig-core/examples/transcription.rs:
--------------------------------------------------------------------------------
  1 | use std::env::args;
  2 | 
  3 | use rig::providers::huggingface;
  4 | use rig::{
  5 |     providers::{azure, gemini, groq, openai},
  6 |     transcription::TranscriptionModel,
  7 | };
  8 | 
  9 | #[tokio::main]
 10 | async fn main() {
 11 |     // Load the path from the first command line argument
 12 |     let args = args().collect::<Vec<_>>();
 13 | 
 14 |     if args.len() <= 1 {
 15 |         println!("No file was specified!");
 16 |         return;
 17 |     }
 18 | 
 19 |     let file_path = args[1].clone();
 20 |     println!("Transcribing {}", &file_path);
 21 | 
 22 |     whisper(&file_path).await;
 23 |     gemini(&file_path).await;
 24 |     azure(&file_path).await;
 25 |     groq(&file_path).await;
 26 |     huggingface(&file_path).await;
 27 | }
 28 | 
 29 | async fn whisper(file_path: &str) {
 30 |     // Create an OAI client
 31 |     let openai = openai::Client::from_env();
 32 | 
 33 |     // Create the whisper transcription model
 34 |     let whisper = openai.transcription_model(openai::WHISPER_1);
 35 | 
 36 |     let response = whisper
 37 |         .transcription_request()
 38 |         .load_file(file_path)
 39 |         .send()
 40 |         .await
 41 |         .expect("Failed to transcribe file");
 42 | 
 43 |     let text = response.text;
 44 | 
 45 |     println!("Whisper-1: {text}")
 46 | }
 47 | 
 48 | async fn gemini(file_path: &str) {
 49 |     // Create an OAI client
 50 |     let gemini = gemini::Client::from_env();
 51 | 
 52 |     // Create the whisper transcription model
 53 |     let gemini = gemini.transcription_model(gemini::transcription::GEMINI_1_5_FLASH);
 54 | 
 55 |     let response = gemini
 56 |         .transcription_request()
 57 |         .load_file(file_path)
 58 |         .send()
 59 |         .await
 60 |         .expect("Failed to transcribe file");
 61 | 
 62 |     let text = response.text;
 63 | 
 64 |     println!("Gemini: {text}")
 65 | }
 66 | 
 67 | async fn azure(file_path: &str) {
 68 |     let azure = azure::Client::from_env();
 69 | 
 70 |     let whisper = azure.transcription_model("whisper");
 71 | 
 72 |     let response = whisper
 73 |         .transcription_request()
 74 |         .load_file(file_path)
 75 |         .send()
 76 |         .await
 77 |         .expect("Failed to transcribe file");
 78 | 
 79 |     let text = response.text;
 80 | 
 81 |     println!("Azure Whisper-1: {text}")
 82 | }
 83 | 
 84 | async fn groq(file_path: &str) {
 85 |     let groq = groq::Client::from_env();
 86 | 
 87 |     // Create the whisper transcription model
 88 |     let whisper = groq.transcription_model(groq::WHISPER_LARGE_V3);
 89 | 
 90 |     let response = whisper
 91 |         .transcription_request()
 92 |         .load_file(file_path)
 93 |         .send()
 94 |         .await
 95 |         .expect("Failed to transcribe file");
 96 | 
 97 |     let text = response.text;
 98 | 
 99 |     println!("Groq Whisper-Large-V3: {text}")
100 | }
101 | 
102 | async fn huggingface(file_path: &str) {
103 |     let huggingface = huggingface::Client::from_env();
104 | 
105 |     let whisper = huggingface.transcription_model(huggingface::WHISPER_LARGE_V3);
106 | 
107 |     let response = whisper
108 |         .transcription_request()
109 |         .load_file(file_path)
110 |         .send()
111 |         .await
112 |         .expect("Failed to transcribe file");
113 | 
114 |     let text = response.text;
115 | 
116 |     println!("Huggingface Whisper-Large-V3: {text}")
117 | }
118 | 


--------------------------------------------------------------------------------
/rig-core/examples/vector_search.rs:
--------------------------------------------------------------------------------
 1 | use std::env;
 2 | 
 3 | use rig::providers::openai::client::Client;
 4 | use rig::{
 5 |     embeddings::EmbeddingsBuilder,
 6 |     providers::openai::TEXT_EMBEDDING_ADA_002,
 7 |     vector_store::{in_memory_store::InMemoryVectorStore, VectorStoreIndex},
 8 |     Embed,
 9 | };
10 | use serde::{Deserialize, Serialize};
11 | 
12 | // Shape of data that needs to be RAG'ed.
13 | // The definition field will be used to generate embeddings.
14 | #[derive(Embed, Clone, Deserialize, Debug, Serialize, Eq, PartialEq, Default)]
15 | struct WordDefinition {
16 |     id: String,
17 |     word: String,
18 |     #[embed]
19 |     definitions: Vec<String>,
20 | }
21 | 
22 | #[tokio::main]
23 | async fn main() -> Result<(), anyhow::Error> {
24 |     // Create OpenAI client
25 |     let openai_api_key = env::var("OPENAI_API_KEY").expect("OPENAI_API_KEY not set");
26 |     let openai_client = Client::new(&openai_api_key);
27 | 
28 |     let embedding_model = openai_client.embedding_model(TEXT_EMBEDDING_ADA_002);
29 | 
30 |     let embeddings = EmbeddingsBuilder::new(embedding_model.clone())
31 |         .documents(vec![
32 |             WordDefinition {
33 |                 id: "doc0".to_string(),
34 |                 word: "flurbo".to_string(),
35 |                 definitions: vec![
36 |                     "A green alien that lives on cold planets.".to_string(),
37 |                     "A fictional digital currency that originated in the animated series Rick and Morty.".to_string()
38 |                 ]
39 |             },
40 |             WordDefinition {
41 |                 id: "doc1".to_string(),
42 |                 word: "glarb-glarb".to_string(),
43 |                 definitions: vec![
44 |                     "An ancient tool used by the ancestors of the inhabitants of planet Jiro to farm the land.".to_string(),
45 |                     "A fictional creature found in the distant, swampy marshlands of the planet Glibbo in the Andromeda galaxy.".to_string()
46 |                 ]
47 |             },
48 |             WordDefinition {
49 |                 id: "doc2".to_string(),
50 |                 word: "linglingdong".to_string(),
51 |                 definitions: vec![
52 |                     "A term used by inhabitants of the sombrero galaxy to describe humans.".to_string(),
53 |                     "A rare, mystical instrument crafted by the ancient monks of the Nebulon Mountain Ranges on the planet Quarm.".to_string()
54 |                 ]
55 |             },
56 |         ])?
57 |         .build()
58 |         .await?;
59 | 
60 |     // Create vector store with the embeddings
61 |     let vector_store =
62 |         InMemoryVectorStore::from_documents_with_id_f(embeddings, |doc| doc.id.clone());
63 | 
64 |     // Create vector store index
65 |     let index = vector_store.index(embedding_model);
66 | 
67 |     let results = index
68 |         .top_n::<WordDefinition>("I need to buy something in a fictional universe. What type of money can I use for this?", 1)
69 |         .await?
70 |         .into_iter()
71 |         .map(|(score, id, doc)| (score, id, doc.word))
72 |         .collect::<Vec<_>>();
73 | 
74 |     println!("Results: {:?}", results);
75 | 
76 |     let id_results = index
77 |         .top_n_ids("I need to buy something in a fictional universe. What type of money can I use for this?", 1)
78 |         .await?
79 |         .into_iter()
80 |         .collect::<Vec<_>>();
81 | 
82 |     println!("ID results: {:?}", id_results);
83 | 
84 |     Ok(())
85 | }
86 | 


--------------------------------------------------------------------------------
/rig-core/examples/vector_search_cohere.rs:
--------------------------------------------------------------------------------
 1 | use std::env;
 2 | 
 3 | use rig::{
 4 |     embeddings::EmbeddingsBuilder,
 5 |     providers::cohere::{Client, EMBED_ENGLISH_V3},
 6 |     vector_store::{in_memory_store::InMemoryVectorStore, VectorStoreIndex},
 7 |     Embed,
 8 | };
 9 | use serde::{Deserialize, Serialize};
10 | 
11 | // Shape of data that needs to be RAG'ed.
12 | // The definition field will be used to generate embeddings.
13 | #[derive(Embed, Clone, Deserialize, Debug, Serialize, Eq, PartialEq, Default)]
14 | struct WordDefinition {
15 |     id: String,
16 |     word: String,
17 |     #[embed]
18 |     definitions: Vec<String>,
19 | }
20 | 
21 | #[tokio::main]
22 | async fn main() -> Result<(), anyhow::Error> {
23 |     // Create Cohere client
24 |     let cohere_api_key = env::var("COHERE_API_KEY").expect("COHERE_API_KEY not set");
25 |     let cohere_client = Client::new(&cohere_api_key);
26 | 
27 |     let document_model = cohere_client.embedding_model(EMBED_ENGLISH_V3, "search_document");
28 |     let search_model = cohere_client.embedding_model(EMBED_ENGLISH_V3, "search_query");
29 | 
30 |     let embeddings = EmbeddingsBuilder::new(document_model.clone())
31 |         .documents(vec![
32 |             WordDefinition {
33 |                 id: "doc0".to_string(),
34 |                 word: "flurbo".to_string(),
35 |                 definitions: vec![
36 |                     "A green alien that lives on cold planets.".to_string(),
37 |                     "A fictional digital currency that originated in the animated series Rick and Morty.".to_string()
38 |                 ]
39 |             },
40 |             WordDefinition {
41 |                 id: "doc1".to_string(),
42 |                 word: "glarb-glarb".to_string(),
43 |                 definitions: vec![
44 |                     "An ancient tool used by the ancestors of the inhabitants of planet Jiro to farm the land.".to_string(),
45 |                     "A fictional creature found in the distant, swampy marshlands of the planet Glibbo in the Andromeda galaxy.".to_string()
46 |                 ]
47 |             },
48 |             WordDefinition {
49 |                 id: "doc2".to_string(),
50 |                 word: "linglingdong".to_string(),
51 |                 definitions: vec![
52 |                     "A term used by inhabitants of the sombrero galaxy to describe humans.".to_string(),
53 |                     "A rare, mystical instrument crafted by the ancient monks of the Nebulon Mountain Ranges on the planet Quarm.".to_string()
54 |                 ]
55 |             },
56 |         ])?
57 |         .build()
58 |         .await?;
59 | 
60 |     // Create vector store with the embeddings
61 |     let vector_store =
62 |         InMemoryVectorStore::from_documents_with_id_f(embeddings, |doc| doc.id.clone());
63 | 
64 |     // Create vector store index
65 |     let index = vector_store.index(search_model);
66 | 
67 |     let results = index
68 |         .top_n::<WordDefinition>(
69 |             "Which instrument is found in the Nebulon Mountain Ranges?",
70 |             1,
71 |         )
72 |         .await?
73 |         .into_iter()
74 |         .map(|(score, id, doc)| (score, id, doc.word))
75 |         .collect::<Vec<_>>();
76 | 
77 |     println!("Results: {:?}", results);
78 | 
79 |     Ok(())
80 | }
81 | 


--------------------------------------------------------------------------------
/rig-core/examples/vector_search_ollama.rs:
--------------------------------------------------------------------------------
 1 | use rig::{
 2 |     embeddings::EmbeddingsBuilder,
 3 |     providers,
 4 |     vector_store::{in_memory_store::InMemoryVectorStore, VectorStoreIndex},
 5 |     Embed,
 6 | };
 7 | use serde::{Deserialize, Serialize};
 8 | 
 9 | // Shape of data that needs to be RAG'ed.
10 | // The definition field will be used to generate embeddings.
11 | #[derive(Embed, Clone, Deserialize, Debug, Serialize, Eq, PartialEq, Default)]
12 | struct WordDefinition {
13 |     id: String,
14 |     word: String,
15 |     #[embed]
16 |     definitions: Vec<String>,
17 | }
18 | 
19 | #[tokio::main]
20 | async fn main() -> Result<(), anyhow::Error> {
21 |     // Create ollama client
22 |     let client = providers::ollama::Client::from_url("http://localhost:11434");
23 | 
24 |     let embedding_model = client.embedding_model("nomic-embed-text");
25 | 
26 |     let embeddings = EmbeddingsBuilder::new(embedding_model.clone())
27 |         .documents(vec![
28 |             WordDefinition {
29 |                 id: "doc0".to_string(),
30 |                 word: "flurbo".to_string(),
31 |                 definitions: vec![
32 |                     "A green alien that lives on cold planets.".to_string(),
33 |                     "A fictional digital currency that originated in the animated series Rick and Morty.".to_string()
34 |                 ]
35 |             },
36 |             WordDefinition {
37 |                 id: "doc1".to_string(),
38 |                 word: "glarb-glarb".to_string(),
39 |                 definitions: vec![
40 |                     "An ancient tool used by the ancestors of the inhabitants of planet Jiro to farm the land.".to_string(),
41 |                     "A fictional creature found in the distant, swampy marshlands of the planet Glibbo in the Andromeda galaxy.".to_string()
42 |                 ]
43 |             },
44 |             WordDefinition {
45 |                 id: "doc2".to_string(),
46 |                 word: "linglingdong".to_string(),
47 |                 definitions: vec![
48 |                     "A term used by inhabitants of the sombrero galaxy to describe humans.".to_string(),
49 |                     "A rare, mystical instrument crafted by the ancient monks of the Nebulon Mountain Ranges on the planet Quarm.".to_string()
50 |                 ]
51 |             },
52 |         ])?
53 |         .build()
54 |         .await?;
55 | 
56 |     // Create vector store with the embeddings
57 |     let vector_store =
58 |         InMemoryVectorStore::from_documents_with_id_f(embeddings, |doc| doc.id.clone());
59 | 
60 |     // Create vector store index
61 |     let index = vector_store.index(embedding_model);
62 | 
63 |     let results = index
64 |         .top_n::<WordDefinition>("I need to buy something in a fictional universe. What type of money can I use for this?", 1)
65 |         .await?
66 |         .into_iter()
67 |         .map(|(score, id, doc)| (score, id, doc.word))
68 |         .collect::<Vec<_>>();
69 | 
70 |     println!("Results: {:?}", results);
71 | 
72 |     let id_results = index
73 |         .top_n_ids("I need to buy something in a fictional universe. What type of money can I use for this?", 1)
74 |         .await?
75 |         .into_iter()
76 |         .collect::<Vec<_>>();
77 | 
78 |     println!("ID results: {:?}", id_results);
79 | 
80 |     Ok(())
81 | }
82 | 


--------------------------------------------------------------------------------
/rig-core/examples/xai_embeddings.rs:
--------------------------------------------------------------------------------
 1 | use rig::providers::xai;
 2 | use rig::Embed;
 3 | 
 4 | #[derive(Embed, Debug)]
 5 | struct Greetings {
 6 |     #[embed]
 7 |     message: String,
 8 | }
 9 | 
10 | #[tokio::main]
11 | async fn main() -> Result<(), anyhow::Error> {
12 |     // Initialize the xAI client
13 |     let client = xai::Client::from_env();
14 | 
15 |     let embeddings = client
16 |         .embeddings(xai::embedding::EMBEDDING_V1)
17 |         .document(Greetings {
18 |             message: "Hello, world!".to_string(),
19 |         })?
20 |         .document(Greetings {
21 |             message: "Goodbye, world!".to_string(),
22 |         })?
23 |         .build()
24 |         .await
25 |         .expect("Failed to embed documents");
26 | 
27 |     println!("{:?}", embeddings);
28 | 
29 |     Ok(())
30 | }
31 | 


--------------------------------------------------------------------------------
/rig-core/examples/xai_streaming.rs:
--------------------------------------------------------------------------------
 1 | use rig::providers::xai;
 2 | use rig::streaming::{stream_to_stdout, StreamingPrompt};
 3 | 
 4 | #[tokio::main]
 5 | async fn main() -> Result<(), anyhow::Error> {
 6 |     // Create streaming agent with a single context prompt
 7 |     let agent = xai::Client::from_env()
 8 |         .agent(xai::GROK_BETA)
 9 |         .preamble("Be precise and concise.")
10 |         .temperature(0.5)
11 |         .build();
12 | 
13 |     // Stream the response and print chunks as they arrive
14 |     let mut stream = agent
15 |         .stream_prompt("When and where and what type is the next solar eclipse?")
16 |         .await?;
17 | 
18 |     stream_to_stdout(agent, &mut stream).await?;
19 | 
20 |     Ok(())
21 | }
22 | 


--------------------------------------------------------------------------------
/rig-core/rig-core-derive/Cargo.toml:
--------------------------------------------------------------------------------
 1 | [package]
 2 | name = "rig-derive"
 3 | version = "0.1.0"
 4 | edition = "2021"
 5 | license = "MIT"
 6 | description = "Internal crate that implements Rig derive macros."
 7 | repository = "https://github.com/0xPlaygrounds/rig"
 8 | 
 9 | [dependencies]
10 | indoc = "2.0.5"
11 | proc-macro2 = { version = "1.0.87", features = ["proc-macro"] }
12 | quote = "1.0.37"
13 | syn = { version = "2.0.79", features = ["full"]}
14 | 
15 | [lib]
16 | proc-macro = true
17 | 


--------------------------------------------------------------------------------
/rig-core/rig-core-derive/src/basic.rs:
--------------------------------------------------------------------------------
 1 | use syn::{parse_quote, Attribute, DataStruct, Meta};
 2 | 
 3 | use crate::EMBED;
 4 | 
 5 | /// Finds and returns fields with simple `#[embed]` attribute tags only.
 6 | pub(crate) fn basic_embed_fields(data_struct: &DataStruct) -> impl Iterator<Item = &syn::Field> {
 7 |     data_struct.fields.iter().filter(|field| {
 8 |         field.attrs.iter().any(|attribute| match attribute {
 9 |             Attribute {
10 |                 meta: Meta::Path(path),
11 |                 ..
12 |             } => path.is_ident(EMBED),
13 |             _ => false,
14 |         })
15 |     })
16 | }
17 | 
18 | /// Adds bounds to where clause that force all fields tagged with `#[embed]` to implement the `Embed` trait.
19 | pub(crate) fn add_struct_bounds(generics: &mut syn::Generics, field_type: &syn::Type) {
20 |     let where_clause = generics.make_where_clause();
21 | 
22 |     where_clause.predicates.push(parse_quote! {
23 |         #field_type: Embed
24 |     });
25 | }
26 | 


--------------------------------------------------------------------------------
/rig-core/rig-core-derive/src/lib.rs:
--------------------------------------------------------------------------------
 1 | extern crate proc_macro;
 2 | use proc_macro::TokenStream;
 3 | use syn::{parse_macro_input, DeriveInput};
 4 | 
 5 | mod basic;
 6 | mod custom;
 7 | mod embed;
 8 | 
 9 | pub(crate) const EMBED: &str = "embed";
10 | 
11 | /// References:
12 | /// <https://doc.rust-lang.org/book/ch19-06-macros.html#how-to-write-a-custom-derive-macro>
13 | /// <https://doc.rust-lang.org/reference/procedural-macros.html>
14 | #[proc_macro_derive(Embed, attributes(embed))]
15 | pub fn derive_embedding_trait(item: TokenStream) -> TokenStream {
16 |     let mut input = parse_macro_input!(item as DeriveInput);
17 | 
18 |     embed::expand_derive_embedding(&mut input)
19 |         .unwrap_or_else(syn::Error::into_compile_error)
20 |         .into()
21 | }
22 | 


--------------------------------------------------------------------------------
/rig-core/src/cli_chatbot.rs:
--------------------------------------------------------------------------------
 1 | use std::io::{self, Write};
 2 | 
 3 | use crate::completion::{Chat, Message, PromptError};
 4 | 
 5 | /// Utility function to create a simple REPL CLI chatbot from a type that implements the
 6 | /// `Chat` trait.
 7 | pub async fn cli_chatbot(chatbot: impl Chat) -> Result<(), PromptError> {
 8 |     let stdin = io::stdin();
 9 |     let mut stdout = io::stdout();
10 |     let mut chat_log = vec![];
11 | 
12 |     println!("Welcome to the chatbot! Type 'exit' to quit.");
13 |     loop {
14 |         print!("> ");
15 |         // Flush stdout to ensure the prompt appears before input
16 |         stdout.flush().unwrap();
17 | 
18 |         let mut input = String::new();
19 |         match stdin.read_line(&mut input) {
20 |             Ok(_) => {
21 |                 // Remove the newline character from the input
22 |                 let input = input.trim();
23 |                 // Check for a command to exit
24 |                 if input == "exit" {
25 |                     break;
26 |                 }
27 |                 tracing::info!("Prompt:\n{}\n", input);
28 | 
29 |                 let response = chatbot.chat(input, chat_log.clone()).await?;
30 |                 chat_log.push(Message::user(input));
31 |                 chat_log.push(Message::assistant(response.clone()));
32 | 
33 |                 println!("========================== Response ============================");
34 |                 println!("{response}");
35 |                 println!("================================================================\n\n");
36 | 
37 |                 tracing::info!("Response:\n{}\n", response);
38 |             }
39 |             Err(error) => println!("Error reading input: {}", error),
40 |         }
41 |     }
42 | 
43 |     Ok(())
44 | }
45 | 


--------------------------------------------------------------------------------
/rig-core/src/completion/mod.rs:
--------------------------------------------------------------------------------
1 | pub mod message;
2 | pub mod request;
3 | 
4 | pub use message::{AssistantContent, Message, MessageError};
5 | pub use request::*;
6 | 


--------------------------------------------------------------------------------
/rig-core/src/embeddings/embedding.rs:
--------------------------------------------------------------------------------
 1 | //! The module defines the [EmbeddingModel] trait, which represents an embedding model that can
 2 | //! generate embeddings for documents.
 3 | //!
 4 | //! The module also defines the [Embedding] struct, which represents a single document embedding.
 5 | //!
 6 | //! Finally, the module defines the [EmbeddingError] enum, which represents various errors that
 7 | //! can occur during embedding generation or processing.
 8 | 
 9 | use serde::{Deserialize, Serialize};
10 | 
11 | #[derive(Debug, thiserror::Error)]
12 | pub enum EmbeddingError {
13 |     /// Http error (e.g.: connection error, timeout, etc.)
14 |     #[error("HttpError: {0}")]
15 |     HttpError(#[from] reqwest::Error),
16 | 
17 |     /// Json error (e.g.: serialization, deserialization)
18 |     #[error("JsonError: {0}")]
19 |     JsonError(#[from] serde_json::Error),
20 | 
21 |     /// Error processing the document for embedding
22 |     #[error("DocumentError: {0}")]
23 |     DocumentError(Box<dyn std::error::Error + Send + Sync + 'static>),
24 | 
25 |     /// Error parsing the completion response
26 |     #[error("ResponseError: {0}")]
27 |     ResponseError(String),
28 | 
29 |     /// Error returned by the embedding model provider
30 |     #[error("ProviderError: {0}")]
31 |     ProviderError(String),
32 | }
33 | 
34 | /// Trait for embedding models that can generate embeddings for documents.
35 | pub trait EmbeddingModel: Clone + Sync + Send {
36 |     /// The maximum number of documents that can be embedded in a single request.
37 |     const MAX_DOCUMENTS: usize;
38 | 
39 |     /// The number of dimensions in the embedding vector.
40 |     fn ndims(&self) -> usize;
41 | 
42 |     /// Embed multiple text documents in a single request
43 |     fn embed_texts(
44 |         &self,
45 |         texts: impl IntoIterator<Item = String> + Send,
46 |     ) -> impl std::future::Future<Output = Result<Vec<Embedding>, EmbeddingError>> + Send;
47 | 
48 |     /// Embed a single text document.
49 |     fn embed_text(
50 |         &self,
51 |         text: &str,
52 |     ) -> impl std::future::Future<Output = Result<Embedding, EmbeddingError>> + Send {
53 |         async {
54 |             Ok(self
55 |                 .embed_texts(vec![text.to_string()])
56 |                 .await?
57 |                 .pop()
58 |                 .expect("There should be at least one embedding"))
59 |         }
60 |     }
61 | }
62 | 
63 | /// Struct that holds a single document and its embedding.
64 | #[derive(Clone, Default, Deserialize, Serialize, Debug)]
65 | pub struct Embedding {
66 |     /// The document that was embedded. Used for debugging.
67 |     pub document: String,
68 |     /// The embedding vector
69 |     pub vec: Vec<f64>,
70 | }
71 | 
72 | impl PartialEq for Embedding {
73 |     fn eq(&self, other: &Self) -> bool {
74 |         self.document == other.document
75 |     }
76 | }
77 | 
78 | impl Eq for Embedding {}
79 | 


--------------------------------------------------------------------------------
/rig-core/src/embeddings/mod.rs:
--------------------------------------------------------------------------------
 1 | //! This module provides functionality for working with embeddings.
 2 | //! Embeddings are numerical representations of documents or other objects, typically used in
 3 | //! natural language processing (NLP) tasks such as text classification, information retrieval,
 4 | //! and document similarity.
 5 | 
 6 | pub mod builder;
 7 | pub mod embed;
 8 | pub mod embedding;
 9 | pub mod tool;
10 | 
11 | pub mod distance;
12 | pub use builder::EmbeddingsBuilder;
13 | pub use embed::{to_texts, Embed, EmbedError, TextEmbedder};
14 | pub use embedding::{Embedding, EmbeddingError, EmbeddingModel};
15 | pub use tool::ToolSchema;
16 | 


--------------------------------------------------------------------------------
/rig-core/src/embeddings/tool.rs:
--------------------------------------------------------------------------------
 1 | //! The module defines the [ToolSchema] struct, which is used to embed an object that implements [crate::tool::ToolEmbedding]
 2 | 
 3 | use crate::{tool::ToolEmbeddingDyn, Embed};
 4 | use serde::Serialize;
 5 | 
 6 | use super::embed::EmbedError;
 7 | 
 8 | /// Embeddable document that is used as an intermediate representation of a tool when
 9 | /// RAGging tools.
10 | #[derive(Clone, Serialize, Default, Eq, PartialEq)]
11 | pub struct ToolSchema {
12 |     pub name: String,
13 |     pub context: serde_json::Value,
14 |     pub embedding_docs: Vec<String>,
15 | }
16 | 
17 | impl Embed for ToolSchema {
18 |     fn embed(&self, embedder: &mut super::embed::TextEmbedder) -> Result<(), EmbedError> {
19 |         for doc in &self.embedding_docs {
20 |             embedder.embed(doc.clone());
21 |         }
22 |         Ok(())
23 |     }
24 | }
25 | 
26 | impl ToolSchema {
27 |     /// Convert item that implements [ToolEmbeddingDyn] to an [ToolSchema].
28 |     ///
29 |     /// # Example
30 |     /// ```rust
31 |     /// use rig::{
32 |     ///     completion::ToolDefinition,
33 |     ///     embeddings::ToolSchema,
34 |     ///     tool::{Tool, ToolEmbedding, ToolEmbeddingDyn},
35 |     /// };
36 |     /// use serde_json::json;
37 |     ///
38 |     /// #[derive(Debug, thiserror::Error)]
39 |     /// #[error("Math error")]
40 |     /// struct NothingError;
41 |     ///
42 |     /// #[derive(Debug, thiserror::Error)]
43 |     /// #[error("Init error")]
44 |     /// struct InitError;
45 |     ///
46 |     /// struct Nothing;
47 |     /// impl Tool for Nothing {
48 |     ///     const NAME: &'static str = "nothing";
49 |     ///
50 |     ///     type Error = NothingError;
51 |     ///     type Args = ();
52 |     ///     type Output = ();
53 |     ///
54 |     ///     async fn definition(&self, _prompt: String) -> ToolDefinition {
55 |     ///         serde_json::from_value(json!({
56 |     ///             "name": "nothing",
57 |     ///             "description": "nothing",
58 |     ///             "parameters": {}
59 |     ///         }))
60 |     ///         .expect("Tool Definition")
61 |     ///     }
62 |     ///
63 |     ///     async fn call(&self, args: Self::Args) -> Result<Self::Output, Self::Error> {
64 |     ///         Ok(())
65 |     ///     }
66 |     /// }
67 |     ///
68 |     /// impl ToolEmbedding for Nothing {
69 |     ///     type InitError = InitError;
70 |     ///     type Context = ();
71 |     ///     type State = ();
72 |     ///
73 |     ///     fn init(_state: Self::State, _context: Self::Context) -> Result<Self, Self::InitError> {
74 |     ///         Ok(Nothing)
75 |     ///     }
76 |     ///
77 |     ///     fn embedding_docs(&self) -> Vec<String> {
78 |     ///         vec!["Do nothing.".into()]
79 |     ///     }
80 |     ///
81 |     ///     fn context(&self) -> Self::Context {}
82 |     /// }
83 |     ///
84 |     /// let tool = ToolSchema::try_from(&Nothing).unwrap();
85 |     ///
86 |     /// assert_eq!(tool.name, "nothing".to_string());
87 |     /// assert_eq!(tool.embedding_docs, vec!["Do nothing.".to_string()]);
88 |     /// ```
89 |     pub fn try_from(tool: &dyn ToolEmbeddingDyn) -> Result<Self, EmbedError> {
90 |         Ok(ToolSchema {
91 |             name: tool.name(),
92 |             context: tool.context().map_err(EmbedError::new)?,
93 |             embedding_docs: tool.embedding_docs(),
94 |         })
95 |     }
96 | }
97 | 


--------------------------------------------------------------------------------
/rig-core/src/loaders/epub/errors.rs:
--------------------------------------------------------------------------------
 1 | use std::error::Error;
 2 | 
 3 | use epub::doc::DocError;
 4 | 
 5 | use crate::loaders::file::FileLoaderError;
 6 | 
 7 | #[derive(thiserror::Error, Debug)]
 8 | pub enum EpubLoaderError {
 9 |     #[error("IO error: {0}")]
10 |     EpubError(#[from] DocError),
11 | 
12 |     #[error("File loader error: {0}")]
13 |     FileLoaderError(#[from] FileLoaderError),
14 | 
15 |     #[error("Text processor error: {0}")]
16 |     TextProcessorError(#[from] Box<dyn Error>),
17 | }
18 | 


--------------------------------------------------------------------------------
/rig-core/src/loaders/epub/mod.rs:
--------------------------------------------------------------------------------
1 | mod errors;
2 | mod loader;
3 | mod text_processors;
4 | 
5 | pub use errors::EpubLoaderError;
6 | pub use loader::{EpubFileLoader, IntoIter};
7 | pub use text_processors::{RawTextProcessor, StripXmlProcessor, TextProcessor};
8 | 


--------------------------------------------------------------------------------
/rig-core/src/loaders/epub/text_processors.rs:
--------------------------------------------------------------------------------
 1 | use std::{convert::Infallible, error::Error};
 2 | 
 3 | use quick_xml::events::Event;
 4 | use quick_xml::Reader;
 5 | 
 6 | // ================================================================
 7 | // Implementing TextProcessor trait for post-processing epubs
 8 | // ================================================================
 9 | 
10 | pub trait TextProcessor {
11 |     type Error: Error + 'static;
12 | 
13 |     fn process(text: &str) -> Result<String, Self::Error>;
14 | }
15 | 
16 | pub struct RawTextProcessor;
17 | 
18 | impl TextProcessor for RawTextProcessor {
19 |     type Error = Infallible;
20 | 
21 |     fn process(text: &str) -> Result<String, Self::Error> {
22 |         Ok(text.to_string())
23 |     }
24 | }
25 | 
26 | #[derive(thiserror::Error, Debug)]
27 | pub enum XmlProcessingError {
28 |     #[error("XML parsing error: {0}")]
29 |     Xml(#[from] quick_xml::Error),
30 | 
31 |     #[error("Failed to unescape XML entity: {0}")]
32 |     Unescape(#[from] quick_xml::events::attributes::AttrError),
33 | 
34 |     #[error("Invalid UTF-8 sequence: {0}")]
35 |     Utf8(#[from] std::string::FromUtf8Error),
36 | }
37 | 
38 | pub struct StripXmlProcessor;
39 | 
40 | impl TextProcessor for StripXmlProcessor {
41 |     type Error = XmlProcessingError;
42 | 
43 |     fn process(xml: &str) -> Result<String, Self::Error> {
44 |         let mut reader = Reader::from_str(xml.trim());
45 | 
46 |         let mut result = String::with_capacity(xml.len() / 2); // Rough estimate
47 |         let mut last_was_text = false;
48 | 
49 |         loop {
50 |             match reader.read_event()? {
51 |                 Event::Text(e) => {
52 |                     let text = e.unescape()?.into_owned();
53 |                     if !text.trim().is_empty() {
54 |                         if last_was_text {
55 |                             result.push(' ');
56 |                         }
57 |                         result.push_str(&text);
58 |                         last_was_text = true;
59 |                     }
60 |                 }
61 |                 Event::CData(e) => {
62 |                     let text = String::from_utf8(e.into_inner().into_owned())?;
63 |                     if !text.trim().is_empty() {
64 |                         if last_was_text {
65 |                             result.push(' ');
66 |                         }
67 |                         result.push_str(&text);
68 |                         last_was_text = true;
69 |                     }
70 |                 }
71 |                 Event::Eof => break,
72 |                 _ => {
73 |                     last_was_text = false;
74 |                 }
75 |             }
76 |         }
77 | 
78 |         Ok(result)
79 |     }
80 | }
81 | 


--------------------------------------------------------------------------------
/rig-core/src/loaders/mod.rs:
--------------------------------------------------------------------------------
 1 | //! This module provides utility structs for loading and preprocessing files.
 2 | //!
 3 | //! The [FileLoader] struct can be used to define a common interface for loading any type of files from disk,
 4 | //! as well as performing minimal preprocessing on the files, such as reading their contents, ignoring errors
 5 | //! and keeping track of file paths along with their contents.
 6 | //!
 7 | //! The [PdfFileLoader] works similarly to the [FileLoader], but is specifically designed to load PDF
 8 | //! files. This loader also provides PDF-specific preprocessing methods for splitting the PDF into pages
 9 | //! and keeping track of the page numbers along with their contents.
10 | //!
11 | //! Note: The [PdfFileLoader] requires the `pdf` feature to be enabled in the `Cargo.toml` file.
12 | //!
13 | //! The [EpubFileLoader] works similarly to the [FileLoader], but is specifically designed to load EPUB
14 | //! files. This loader also provides EPUB-specific preprocessing methods for splitting the EPUB into chapters
15 | //! and keeping track of the chapter numbers along with their contents.
16 | //!
17 | //! Note: The [EpubFileLoader] requires the `epub` feature to be enabled in the `Cargo.toml` file.
18 | 
19 | pub mod file;
20 | 
21 | pub use file::FileLoader;
22 | 
23 | #[cfg(feature = "pdf")]
24 | pub mod pdf;
25 | 
26 | #[cfg(feature = "pdf")]
27 | pub use pdf::PdfFileLoader;
28 | 
29 | #[cfg(feature = "epub")]
30 | pub mod epub;
31 | 
32 | #[cfg(feature = "epub")]
33 | pub use epub::{EpubFileLoader, RawTextProcessor, StripXmlProcessor, TextProcessor};
34 | 


--------------------------------------------------------------------------------
/rig-core/src/providers/anthropic/decoders/mod.rs:
--------------------------------------------------------------------------------
 1 | /*
 2 |  * The code from this module is a Rust port of the
 3 |  * https://github.com/anthropics/anthropic-sdk-typescript/tree/main decoders
 4 |  *
 5 |  * The original code is licensed under MIT license
 6 |  * https://github.com/anthropics/anthropic-sdk-typescript/blob/main/LICENSE
 7 |  */
 8 | pub mod jsonl;
 9 | pub mod line;
10 | pub mod sse;
11 | 


--------------------------------------------------------------------------------
/rig-core/src/providers/anthropic/mod.rs:
--------------------------------------------------------------------------------
 1 | //! Anthropic API client and Rig integration
 2 | //!
 3 | //! # Example
 4 | //! ```
 5 | //! use rig::providers::anthropic;
 6 | //!
 7 | //! let client = anthropic::Anthropic::new("YOUR_API_KEY");
 8 | //!
 9 | //! let sonnet = client.completion_model(anthropic::CLAUDE_3_5_SONNET);
10 | //! ```
11 | 
12 | pub mod client;
13 | pub mod completion;
14 | pub mod decoders;
15 | pub mod streaming;
16 | 
17 | pub use client::{Client, ClientBuilder};
18 | pub use completion::{
19 |     ANTHROPIC_VERSION_2023_01_01, ANTHROPIC_VERSION_2023_06_01, ANTHROPIC_VERSION_LATEST,
20 |     CLAUDE_3_5_SONNET, CLAUDE_3_7_SONNET, CLAUDE_3_HAIKU, CLAUDE_3_OPUS, CLAUDE_3_SONNET,
21 | };
22 | 


--------------------------------------------------------------------------------
/rig-core/src/providers/cohere/mod.rs:
--------------------------------------------------------------------------------
 1 | //! Cohere API client and Rig integration
 2 | //!
 3 | //! # Example
 4 | //! ```
 5 | //! use rig::providers::cohere;
 6 | //!
 7 | //! let client = cohere::Client::new("YOUR_API_KEY");
 8 | //!
 9 | //! let command_r = client.completion_model(cohere::COMMAND_R);
10 | //! ```
11 | 
12 | pub mod client;
13 | pub mod completion;
14 | pub mod embeddings;
15 | 
16 | pub use client::Client;
17 | pub use client::{ApiErrorResponse, ApiResponse};
18 | pub use completion::CompletionModel;
19 | pub use embeddings::EmbeddingModel;
20 | 
21 | // ================================================================
22 | // Cohere Completion Models
23 | // ================================================================
24 | 
25 | /// `command-r-plus` completion model
26 | pub const COMMAND_R_PLUS: &str = "comman-r-plus";
27 | /// `command-r` completion model
28 | pub const COMMAND_R: &str = "command-r";
29 | /// `command` completion model
30 | pub const COMMAND: &str = "command";
31 | /// `command-nightly` completion model
32 | pub const COMMAND_NIGHTLY: &str = "command-nightly";
33 | /// `command-light` completion model
34 | pub const COMMAND_LIGHT: &str = "command-light";
35 | /// `command-light-nightly` completion model
36 | pub const COMMAND_LIGHT_NIGHTLY: &str = "command-light-nightly";
37 | 
38 | // ================================================================
39 | // Cohere Embedding Models
40 | // ================================================================
41 | 
42 | /// `embed-english-v3.0` embedding model
43 | pub const EMBED_ENGLISH_V3: &str = "embed-english-v3.0";
44 | /// `embed-english-light-v3.0` embedding model
45 | pub const EMBED_ENGLISH_LIGHT_V3: &str = "embed-english-light-v3.0";
46 | /// `embed-multilingual-v3.0` embedding model
47 | pub const EMBED_MULTILINGUAL_V3: &str = "embed-multilingual-v3.0";
48 | /// `embed-multilingual-light-v3.0` embedding model
49 | pub const EMBED_MULTILINGUAL_LIGHT_V3: &str = "embed-multilingual-light-v3.0";
50 | /// `embed-english-v2.0` embedding model
51 | pub const EMBED_ENGLISH_V2: &str = "embed-english-v2.0";
52 | /// `embed-english-light-v2.0` embedding model
53 | pub const EMBED_ENGLISH_LIGHT_V2: &str = "embed-english-light-v2.0";
54 | /// `embed-multilingual-v2.0` embedding model
55 | pub const EMBED_MULTILINGUAL_V2: &str = "embed-multilingual-v2.0";
56 | 


--------------------------------------------------------------------------------
/rig-core/src/providers/gemini/mod.rs:
--------------------------------------------------------------------------------
 1 | //! Google Gemini API client and Rig integration
 2 | //!
 3 | //! # Example
 4 | //! ```
 5 | //! use rig::providers::google;
 6 | //!
 7 | //! let client = google::Client::new("YOUR_API_KEY");
 8 | //!
 9 | //! let gemini_embedding_model = client.embedding_model(google::EMBEDDING_001);
10 | //! ```
11 | 
12 | pub mod client;
13 | pub mod completion;
14 | pub mod embedding;
15 | pub mod streaming;
16 | pub mod transcription;
17 | 
18 | pub use client::Client;
19 | 
20 | pub mod gemini_api_types {
21 |     use serde::{Deserialize, Serialize};
22 | 
23 |     #[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
24 |     #[serde(rename_all = "SCREAMING_SNAKE_CASE")]
25 |     pub enum ExecutionLanguage {
26 |         /// Unspecified language. This value should not be used.
27 |         LanguageUnspecified,
28 |         /// Python >= 3.10, with numpy and simpy available.
29 |         Python,
30 |     }
31 | 
32 |     /// Code generated by the model that is meant to be executed, and the result returned to the model.
33 |     /// Only generated when using the CodeExecution tool, in which the code will be automatically executed,
34 |     /// and a corresponding CodeExecutionResult will also be generated.
35 |     #[derive(Debug, Deserialize, Serialize, Clone, PartialEq)]
36 |     pub struct ExecutableCode {
37 |         /// Programming language of the code.
38 |         pub language: ExecutionLanguage,
39 |         /// The code to be executed.
40 |         pub code: String,
41 |     }
42 |     #[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
43 |     pub struct CodeExecutionResult {
44 |         /// Outcome of the code execution.
45 |         pub outcome: CodeExecutionOutcome,
46 |         /// Contains stdout when code execution is successful, stderr or other description otherwise.
47 |         #[serde(skip_serializing_if = "Option::is_none")]
48 |         pub output: Option<String>,
49 |     }
50 | 
51 |     #[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
52 |     pub enum CodeExecutionOutcome {
53 |         /// Unspecified status. This value should not be used.
54 |         #[serde(rename = "OUTCOME_UNSPECIFIED")]
55 |         Unspecified,
56 |         /// Code execution completed successfully.
57 |         #[serde(rename = "OUTCOME_OK")]
58 |         Ok,
59 |         /// Code execution finished but with a failure. stderr should contain the reason.
60 |         #[serde(rename = "OUTCOME_FAILED")]
61 |         Failed,
62 |         /// Code execution ran for too long, and was cancelled. There may or may not be a partial output present.
63 |         #[serde(rename = "OUTCOME_DEADLINE_EXCEEDED")]
64 |         DeadlineExceeded,
65 |     }
66 | }
67 | 


--------------------------------------------------------------------------------
/rig-core/src/providers/gemini/streaming.rs:
--------------------------------------------------------------------------------
 1 | use async_stream::stream;
 2 | use futures::StreamExt;
 3 | use serde::Deserialize;
 4 | 
 5 | use crate::{
 6 |     completion::{CompletionError, CompletionRequest},
 7 |     streaming::{self, StreamingCompletionModel, StreamingResult},
 8 | };
 9 | 
10 | use super::completion::{create_request_body, gemini_api_types::ContentCandidate, CompletionModel};
11 | 
12 | #[derive(Debug, Deserialize)]
13 | #[serde(rename_all = "camelCase")]
14 | pub struct StreamGenerateContentResponse {
15 |     /// Candidate responses from the model.
16 |     pub candidates: Vec<ContentCandidate>,
17 |     pub model_version: Option<String>,
18 | }
19 | 
20 | impl StreamingCompletionModel for CompletionModel {
21 |     async fn stream(
22 |         &self,
23 |         completion_request: CompletionRequest,
24 |     ) -> Result<StreamingResult, CompletionError> {
25 |         let request = create_request_body(completion_request)?;
26 | 
27 |         let response = self
28 |             .client
29 |             .post_sse(&format!(
30 |                 "/v1beta/models/{}:streamGenerateContent",
31 |                 self.model
32 |             ))
33 |             .json(&request)
34 |             .send()
35 |             .await?;
36 | 
37 |         if !response.status().is_success() {
38 |             return Err(CompletionError::ProviderError(format!(
39 |                 "{}: {}",
40 |                 response.status(),
41 |                 response.text().await?
42 |             )));
43 |         }
44 | 
45 |         Ok(Box::pin(stream! {
46 |             let mut stream = response.bytes_stream();
47 | 
48 |             while let Some(chunk_result) = stream.next().await {
49 |                 let chunk = match chunk_result {
50 |                     Ok(c) => c,
51 |                     Err(e) => {
52 |                         yield Err(CompletionError::from(e));
53 |                         break;
54 |                     }
55 |                 };
56 | 
57 |                 let text = match String::from_utf8(chunk.to_vec()) {
58 |                     Ok(t) => t,
59 |                     Err(e) => {
60 |                         yield Err(CompletionError::ResponseError(e.to_string()));
61 |                         break;
62 |                     }
63 |                 };
64 | 
65 | 
66 |                 for line in text.lines() {
67 |                     let Some(line) = line.strip_prefix("data: ") else { continue; };
68 | 
69 |                     let Ok(data) = serde_json::from_str::<StreamGenerateContentResponse>(line) else {
70 |                         continue;
71 |                     };
72 | 
73 |                     let choice = data.candidates.first().expect("Should have at least one choice");
74 | 
75 |                     match choice.content.parts.first() {
76 |                         super::completion::gemini_api_types::Part::Text(text)
77 |                             => yield Ok(streaming::StreamingChoice::Message(text)),
78 |                         super::completion::gemini_api_types::Part::FunctionCall(function_call)
79 |                             => yield Ok(streaming::StreamingChoice::ToolCall(function_call.name, "".to_string(), function_call.args)),
80 |                         _ => panic!("Unsupported response type with streaming.")
81 |                     };
82 |                 }
83 |             }
84 |         }))
85 |     }
86 | }
87 | 


--------------------------------------------------------------------------------
/rig-core/src/providers/huggingface/image_generation.rs:
--------------------------------------------------------------------------------
 1 | use super::Client;
 2 | use crate::image_generation;
 3 | use crate::image_generation::{ImageGenerationError, ImageGenerationRequest};
 4 | use serde_json::json;
 5 | 
 6 | pub const FLUX_1: &str = "black-forest-labs/FLUX.1-dev";
 7 | pub const KOLORS: &str = "Kwai-Kolors/Kolors";
 8 | pub const STABLE_DIFFUSION_3: &str = "stabilityai/stable-diffusion-3-medium-diffusers";
 9 | 
10 | #[derive(Debug)]
11 | pub struct ImageGenerationResponse {
12 |     data: Vec<u8>,
13 | }
14 | 
15 | impl TryFrom<ImageGenerationResponse>
16 |     for image_generation::ImageGenerationResponse<ImageGenerationResponse>
17 | {
18 |     type Error = ImageGenerationError;
19 | 
20 |     fn try_from(value: ImageGenerationResponse) -> Result<Self, Self::Error> {
21 |         Ok(image_generation::ImageGenerationResponse {
22 |             image: value.data.clone(),
23 |             response: value,
24 |         })
25 |     }
26 | }
27 | 
28 | #[derive(Clone)]
29 | pub struct ImageGenerationModel {
30 |     client: Client,
31 |     pub model: String,
32 | }
33 | 
34 | impl ImageGenerationModel {
35 |     pub fn new(client: Client, model: &str) -> Self {
36 |         ImageGenerationModel {
37 |             client,
38 |             model: model.to_string(),
39 |         }
40 |     }
41 | }
42 | 
43 | impl image_generation::ImageGenerationModel for ImageGenerationModel {
44 |     type Response = ImageGenerationResponse;
45 | 
46 |     async fn image_generation(
47 |         &self,
48 |         request: ImageGenerationRequest,
49 |     ) -> Result<image_generation::ImageGenerationResponse<Self::Response>, ImageGenerationError>
50 |     {
51 |         let request = json!({
52 |             "inputs": request.prompt,
53 |             "parameters": {
54 |                 "width": request.width,
55 |                 "height": request.height
56 |             }
57 |         });
58 | 
59 |         let route = self
60 |             .client
61 |             .sub_provider
62 |             .image_generation_endpoint(&self.model)?;
63 | 
64 |         let response = self.client.post(&route).json(&request).send().await?;
65 | 
66 |         if !response.status().is_success() {
67 |             return Err(ImageGenerationError::ProviderError(format!(
68 |                 "{}: {}",
69 |                 response.status(),
70 |                 response.text().await?
71 |             )));
72 |         }
73 | 
74 |         let data = response.bytes().await?.to_vec();
75 | 
76 |         ImageGenerationResponse { data }.try_into()
77 |     }
78 | }
79 | 


--------------------------------------------------------------------------------
/rig-core/src/providers/huggingface/mod.rs:
--------------------------------------------------------------------------------
 1 | //! Create a new completion model with the given name
 2 | //!
 3 | //! # Example
 4 | //! ```
 5 | //! use rig::providers::huggingface::{client::self, completion::self}
 6 | //!
 7 | //! // Initialize the Huggingface client
 8 | //! let client = client::Client::new("your-huggingface-api-key");
 9 | //!
10 | //! let completion_model = client.completion_model(completion::GEMMA_2);
11 | //! ```
12 | 
13 | pub mod client;
14 | pub mod completion;
15 | 
16 | #[cfg(feature = "image")]
17 | pub mod image_generation;
18 | pub mod streaming;
19 | pub mod transcription;
20 | 
21 | pub use client::{Client, ClientBuilder, SubProvider};
22 | pub use completion::{
23 |     GEMMA_2, META_LLAMA_3_1, PHI_4, QWEN2_5, QWEN2_5_CODER, QWEN2_VL, QWEN_QVQ_PREVIEW,
24 |     SMALLTHINKER_PREVIEW,
25 | };
26 | 
27 | #[cfg(feature = "image")]
28 | pub use image_generation::{FLUX_1, KOLORS, STABLE_DIFFUSION_3};
29 | pub use transcription::{WHISPER_LARGE_V3, WHISPER_LARGE_V3_TURBO, WHISPER_SMALL};
30 | 


--------------------------------------------------------------------------------
/rig-core/src/providers/huggingface/streaming.rs:
--------------------------------------------------------------------------------
 1 | use super::completion::CompletionModel;
 2 | use crate::completion::{CompletionError, CompletionRequest};
 3 | use crate::json_utils;
 4 | use crate::json_utils::merge_inplace;
 5 | use crate::providers::openai::send_compatible_streaming_request;
 6 | use crate::streaming::{StreamingCompletionModel, StreamingResult};
 7 | use serde::{Deserialize, Serialize};
 8 | use serde_json::{json, Value};
 9 | use std::convert::Infallible;
10 | use std::str::FromStr;
11 | 
12 | #[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
13 | #[serde(rename_all = "lowercase", tag = "type")]
14 | /// Represents the content sent back in the StreamDelta for an Assistant
15 | enum AssistantContent {
16 |     Text { text: String },
17 | }
18 | 
19 | // Ensure that string contents can be serialized correctly
20 | impl FromStr for AssistantContent {
21 |     type Err = Infallible;
22 | 
23 |     fn from_str(s: &str) -> Result<Self, Self::Err> {
24 |         Ok(AssistantContent::Text {
25 |             text: s.to_string(),
26 |         })
27 |     }
28 | }
29 | 
30 | #[derive(Debug, Deserialize, Serialize, PartialEq, Clone)]
31 | #[serde(rename_all = "lowercase", tag = "role")]
32 | enum StreamDelta {
33 |     Assistant {
34 |         #[serde(deserialize_with = "json_utils::string_or_vec")]
35 |         content: Vec<AssistantContent>,
36 |     },
37 | }
38 | 
39 | #[derive(Debug, Deserialize, Serialize, PartialEq, Clone)]
40 | struct StreamingChoice {
41 |     index: usize,
42 |     delta: StreamDelta,
43 |     logprobs: Value,
44 |     finish_reason: Option<String>,
45 | }
46 | 
47 | #[derive(Debug, Deserialize, Serialize, PartialEq, Clone)]
48 | struct CompletionChunk {
49 |     id: String,
50 |     created: i32,
51 |     model: String,
52 |     #[serde(default)]
53 |     system_fingerprint: String,
54 |     choices: Vec<StreamingChoice>,
55 | }
56 | 
57 | impl StreamingCompletionModel for CompletionModel {
58 |     async fn stream(
59 |         &self,
60 |         completion_request: CompletionRequest,
61 |     ) -> Result<StreamingResult, CompletionError> {
62 |         let mut request = self.create_request_body(&completion_request)?;
63 | 
64 |         // Enable streaming
65 |         merge_inplace(&mut request, json!({"stream": true}));
66 | 
67 |         if let Some(ref params) = completion_request.additional_params {
68 |             merge_inplace(&mut request, params.clone());
69 |         }
70 | 
71 |         // HF Inference API uses the model in the path even though its specified in the request body
72 |         let path = self.client.sub_provider.completion_endpoint(&self.model);
73 | 
74 |         let builder = self.client.post(&path).json(&request);
75 | 
76 |         send_compatible_streaming_request(builder).await
77 |     }
78 | }
79 | 


--------------------------------------------------------------------------------
/rig-core/src/providers/huggingface/transcription.rs:
--------------------------------------------------------------------------------
 1 | use crate::providers::huggingface::completion::ApiResponse;
 2 | use crate::providers::huggingface::Client;
 3 | use crate::transcription;
 4 | use crate::transcription::TranscriptionError;
 5 | use base64::prelude::BASE64_STANDARD;
 6 | use base64::Engine;
 7 | use serde::Deserialize;
 8 | use serde_json::json;
 9 | 
10 | pub const WHISPER_LARGE_V3: &str = "openai/whisper-large-v3";
11 | pub const WHISPER_LARGE_V3_TURBO: &str = "openai/whisper-large-v3-turbo";
12 | pub const WHISPER_SMALL: &str = "openai/whisper-small";
13 | 
14 | #[derive(Debug, Deserialize)]
15 | pub struct TranscriptionResponse {
16 |     pub text: String,
17 | }
18 | 
19 | impl TryFrom<TranscriptionResponse>
20 |     for transcription::TranscriptionResponse<TranscriptionResponse>
21 | {
22 |     type Error = TranscriptionError;
23 | 
24 |     fn try_from(value: TranscriptionResponse) -> Result<Self, Self::Error> {
25 |         Ok(transcription::TranscriptionResponse {
26 |             text: value.text.clone(),
27 |             response: value,
28 |         })
29 |     }
30 | }
31 | 
32 | #[derive(Clone)]
33 | pub struct TranscriptionModel {
34 |     client: Client,
35 |     /// Name of the model (e.g.: gpt-3.5-turbo-1106)
36 |     pub model: String,
37 | }
38 | 
39 | impl TranscriptionModel {
40 |     pub fn new(client: Client, model: &str) -> Self {
41 |         Self {
42 |             client,
43 |             model: model.to_string(),
44 |         }
45 |     }
46 | }
47 | impl transcription::TranscriptionModel for TranscriptionModel {
48 |     type Response = TranscriptionResponse;
49 | 
50 |     #[cfg_attr(feature = "worker", worker::send)]
51 |     async fn transcription(
52 |         &self,
53 |         request: transcription::TranscriptionRequest,
54 |     ) -> Result<transcription::TranscriptionResponse<Self::Response>, TranscriptionError> {
55 |         let data = request.data;
56 |         let data = BASE64_STANDARD.encode(data);
57 | 
58 |         let request = json!({
59 |             "inputs": data
60 |         });
61 | 
62 |         let route = self
63 |             .client
64 |             .sub_provider
65 |             .transcription_endpoint(&self.model)?;
66 |         let response = self.client.post(&route).json(&request).send().await?;
67 | 
68 |         if response.status().is_success() {
69 |             match response
70 |                 .json::<ApiResponse<TranscriptionResponse>>()
71 |                 .await?
72 |             {
73 |                 ApiResponse::Ok(response) => response.try_into(),
74 |                 ApiResponse::Err(err) => Err(TranscriptionError::ProviderError(err.to_string())),
75 |             }
76 |         } else {
77 |             Err(TranscriptionError::ProviderError(response.text().await?))
78 |         }
79 |     }
80 | }
81 | 


--------------------------------------------------------------------------------
/rig-core/src/providers/mod.rs:
--------------------------------------------------------------------------------
 1 | //! This module contains clients for the different LLM providers that Rig supports.
 2 | //!
 3 | //! Currently, the following providers are supported:
 4 | //! - Cohere
 5 | //! - OpenAI
 6 | //! - Perplexity
 7 | //! - Anthropic
 8 | //! - Google Gemini
 9 | //! - xAI
10 | //! - EternalAI
11 | //! - DeepSeek
12 | //! - Azure OpenAI
13 | //! - Mira
14 | //!
15 | //! Each provider has its own module, which contains a `Client` implementation that can
16 | //! be used to initialize completion and embedding models and execute requests to those models.
17 | //!
18 | //! The clients also contain methods to easily create higher level AI constructs such as
19 | //! agents and RAG systems, reducing the need for boilerplate.
20 | //!
21 | //! # Example
22 | //! ```
23 | //! use rig::{providers::openai, agent::AgentBuilder};
24 | //!
25 | //! // Initialize the OpenAI client
26 | //! let openai = openai::Client::new("your-openai-api-key");
27 | //!
28 | //! // Create a model and initialize an agent
29 | //! let gpt_4o = openai.completion_model("gpt-4o");
30 | //!
31 | //! let agent = AgentBuilder::new(gpt_4o)
32 | //!     .preamble("\
33 | //!         You are Gandalf the white and you will be conversing with other \
34 | //!         powerful beings to discuss the fate of Middle Earth.\
35 | //!     ")
36 | //!     .build();
37 | //!
38 | //! // Alternatively, you can initialize an agent directly
39 | //! let agent = openai.agent("gpt-4o")
40 | //!     .preamble("\
41 | //!         You are Gandalf the white and you will be conversing with other \
42 | //!         powerful beings to discuss the fate of Middle Earth.\
43 | //!     ")
44 | //!     .build();
45 | //! ```
46 | //! Note: The example above uses the OpenAI provider client, but the same pattern can
47 | //! be used with the Cohere provider client.
48 | pub mod anthropic;
49 | pub mod azure;
50 | pub mod cohere;
51 | pub mod deepseek;
52 | pub mod galadriel;
53 | pub mod gemini;
54 | pub mod groq;
55 | pub mod huggingface;
56 | pub mod hyperbolic;
57 | pub mod mira;
58 | pub mod moonshot;
59 | pub mod ollama;
60 | pub mod openai;
61 | pub mod openrouter;
62 | pub mod perplexity;
63 | pub mod together;
64 | pub mod xai;
65 | 


--------------------------------------------------------------------------------
/rig-core/src/providers/openai/audio_generation.rs:
--------------------------------------------------------------------------------
 1 | use crate::audio_generation::{
 2 |     self, AudioGenerationError, AudioGenerationRequest, AudioGenerationResponse,
 3 | };
 4 | use crate::providers::openai::Client;
 5 | use bytes::Bytes;
 6 | use serde_json::json;
 7 | 
 8 | pub const TTS_1: &str = "tts-1";
 9 | pub const TTS_1_HD: &str = "tts-1-hd";
10 | 
11 | #[derive(Clone)]
12 | pub struct AudioGenerationModel {
13 |     client: Client,
14 |     pub model: String,
15 | }
16 | 
17 | impl AudioGenerationModel {
18 |     pub fn new(client: Client, model: &str) -> Self {
19 |         Self {
20 |             client,
21 |             model: model.to_string(),
22 |         }
23 |     }
24 | }
25 | 
26 | impl audio_generation::AudioGenerationModel for AudioGenerationModel {
27 |     type Response = Bytes;
28 | 
29 |     async fn audio_generation(
30 |         &self,
31 |         request: AudioGenerationRequest,
32 |     ) -> Result<AudioGenerationResponse<Self::Response>, AudioGenerationError> {
33 |         let request = json!({
34 |             "model": self.model,
35 |             "input": request.text,
36 |             "voice": request.voice,
37 |             "speed": request.speed,
38 |         });
39 | 
40 |         let response = self
41 |             .client
42 |             .post("/audio/speech")
43 |             .json(&request)
44 |             .send()
45 |             .await?;
46 | 
47 |         if !response.status().is_success() {
48 |             return Err(AudioGenerationError::ProviderError(format!(
49 |                 "{}: {}",
50 |                 response.status(),
51 |                 response.text().await?
52 |             )));
53 |         }
54 | 
55 |         let bytes = response.bytes().await?;
56 | 
57 |         Ok(AudioGenerationResponse {
58 |             audio: bytes.to_vec(),
59 |             response: bytes,
60 |         })
61 |     }
62 | }
63 | 


--------------------------------------------------------------------------------
/rig-core/src/providers/openai/image_generation.rs:
--------------------------------------------------------------------------------
 1 | use crate::image_generation;
 2 | use crate::image_generation::{ImageGenerationError, ImageGenerationRequest};
 3 | use crate::providers::openai::{ApiResponse, Client};
 4 | use base64::prelude::BASE64_STANDARD;
 5 | use base64::Engine;
 6 | use serde::Deserialize;
 7 | use serde_json::json;
 8 | 
 9 | // ================================================================
10 | // OpenAI Image Generation API
11 | // ================================================================
12 | pub const DALL_E_2: &str = "dall-e-2";
13 | pub const DALL_E_3: &str = "dall-e-3";
14 | 
15 | #[derive(Debug, Deserialize)]
16 | pub struct ImageGenerationData {
17 |     pub b64_json: String,
18 | }
19 | 
20 | #[derive(Debug, Deserialize)]
21 | pub struct ImageGenerationResponse {
22 |     pub created: i32,
23 |     pub data: Vec<ImageGenerationData>,
24 | }
25 | 
26 | impl TryFrom<ImageGenerationResponse>
27 |     for image_generation::ImageGenerationResponse<ImageGenerationResponse>
28 | {
29 |     type Error = ImageGenerationError;
30 | 
31 |     fn try_from(value: ImageGenerationResponse) -> Result<Self, Self::Error> {
32 |         let b64_json = value.data[0].b64_json.clone();
33 | 
34 |         let bytes = BASE64_STANDARD
35 |             .decode(&b64_json)
36 |             .expect("Failed to decode b64");
37 | 
38 |         Ok(image_generation::ImageGenerationResponse {
39 |             image: bytes,
40 |             response: value,
41 |         })
42 |     }
43 | }
44 | 
45 | #[derive(Clone)]
46 | pub struct ImageGenerationModel {
47 |     client: Client,
48 |     /// Name of the model (e.g.: dall-e-2)
49 |     pub model: String,
50 | }
51 | 
52 | impl ImageGenerationModel {
53 |     pub(crate) fn new(client: Client, model: &str) -> Self {
54 |         Self {
55 |             client,
56 |             model: model.to_string(),
57 |         }
58 |     }
59 | }
60 | 
61 | impl image_generation::ImageGenerationModel for ImageGenerationModel {
62 |     type Response = ImageGenerationResponse;
63 | 
64 |     async fn image_generation(
65 |         &self,
66 |         generation_request: ImageGenerationRequest,
67 |     ) -> Result<image_generation::ImageGenerationResponse<Self::Response>, ImageGenerationError>
68 |     {
69 |         let request = json!({
70 |             "model": self.model,
71 |             "prompt": generation_request.prompt,
72 |             "size": format!("{}x{}", generation_request.width, generation_request.height),
73 |             "response_format": "b64_json"
74 |         });
75 | 
76 |         let response = self
77 |             .client
78 |             .post("/images/generations")
79 |             .json(&request)
80 |             .send()
81 |             .await?;
82 | 
83 |         if !response.status().is_success() {
84 |             return Err(ImageGenerationError::ProviderError(format!(
85 |                 "{}: {}",
86 |                 response.status(),
87 |                 response.text().await?
88 |             )));
89 |         }
90 | 
91 |         let t = response.text().await?;
92 | 
93 |         match serde_json::from_str::<ApiResponse<ImageGenerationResponse>>(&t)? {
94 |             ApiResponse::Ok(response) => response.try_into(),
95 |             ApiResponse::Err(err) => Err(ImageGenerationError::ProviderError(err.message)),
96 |         }
97 |     }
98 | }
99 | 


--------------------------------------------------------------------------------
/rig-core/src/providers/openai/mod.rs:
--------------------------------------------------------------------------------
 1 | //! OpenAI API client and Rig integration
 2 | //!
 3 | //! # Example
 4 | //! ```
 5 | //! use rig::providers::openai;
 6 | //!
 7 | //! let client = openai::Client::new("YOUR_API_KEY");
 8 | //!
 9 | //! let gpt4o = client.completion_model(openai::GPT_4O);
10 | //! ```
11 | pub mod client;
12 | pub mod completion;
13 | pub mod embedding;
14 | 
15 | #[cfg(feature = "audio")]
16 | pub mod audio_generation;
17 | #[cfg(feature = "image")]
18 | pub mod image_generation;
19 | pub mod streaming;
20 | pub mod transcription;
21 | 
22 | pub use client::*;
23 | pub use completion::*;
24 | pub use embedding::*;
25 | 
26 | #[cfg(feature = "audio")]
27 | pub use audio_generation::{TTS_1, TTS_1_HD};
28 | 
29 | #[cfg(feature = "image")]
30 | pub use image_generation::*;
31 | pub use streaming::*;
32 | pub use transcription::*;
33 | 


--------------------------------------------------------------------------------
/rig-core/src/providers/together/mod.rs:
--------------------------------------------------------------------------------
 1 | //! Together AI API client and Rig integration
 2 | //!
 3 | //! # Example
 4 | //! ```
 5 | //! use rig::providers::together_ai;
 6 | //!
 7 | //! let client = together_ai::Client::new("YOUR_API_KEY");
 8 | //!
 9 | //! let together_embedding_model = client.embedding_model(together_ai::EMBEDDING_V1);
10 | //! ```
11 | 
12 | pub mod client;
13 | pub mod completion;
14 | pub mod embedding;
15 | pub mod streaming;
16 | 
17 | pub use client::Client;
18 | pub use completion::{
19 |     ALPACA_7B, CHRONOS_HERMES_13B, CODE_LLAMA_13B_INSTRUCT, CODE_LLAMA_13B_INSTRUCT_TOGETHER,
20 |     CODE_LLAMA_34B_INSTRUCT, CODE_LLAMA_34B_INSTRUCT_TOGETHER, CODE_LLAMA_70B_INSTRUCT,
21 |     CODE_LLAMA_7B_INSTRUCT_TOGETHER, DBRX_INSTRUCT, DEEPSEEK_CODER_33B_INSTRUCT,
22 |     DEEPSEEK_LLM_67B_CHAT, DOLPHIN_2_5_MIXTRAL_8X7B, GEMMA_2B_IT, GEMMA_2_27B_IT, GEMMA_2_9B_IT,
23 |     GEMMA_7B_IT, GUANACO_13B, GUANACO_33B, GUANACO_65B, GUANACO_7B, HERMES_2_THETA_LLAMA_3_70B,
24 |     KOALA_13B, KOALA_7B, LLAMA_2_13B_CHAT, LLAMA_2_13B_CHAT_TOGETHER, LLAMA_2_70B_CHAT_TOGETHER,
25 |     LLAMA_2_7B_CHAT, LLAMA_2_7B_CHAT_TOGETHER, LLAMA_3_1_405B_INSTRUCT_LITE_PRO,
26 |     LLAMA_3_1_405B_INSTRUCT_TURBO, LLAMA_3_1_70B_INSTRUCT_REFERENCE, LLAMA_3_1_70B_INSTRUCT_TURBO,
27 |     LLAMA_3_1_8B_INSTRUCT_REFERENCE, LLAMA_3_1_8B_INSTRUCT_TURBO,
28 |     LLAMA_3_2_11B_VISION_INSTRUCT_TURBO, LLAMA_3_2_3B_INSTRUCT_TURBO,
29 |     LLAMA_3_2_90B_VISION_INSTRUCT_TURBO, LLAMA_3_70B_CHAT_HF, LLAMA_3_70B_INSTRUCT,
30 |     LLAMA_3_70B_INSTRUCT_GRADIENT_1048K, LLAMA_3_70B_INSTRUCT_LITE, LLAMA_3_70B_INSTRUCT_TURBO,
31 |     LLAMA_3_8B_CHAT_HF, LLAMA_3_8B_CHAT_HF_INT4, LLAMA_3_8B_CHAT_HF_INT8, LLAMA_3_8B_INSTRUCT,
32 |     LLAMA_3_8B_INSTRUCT_LITE, LLAMA_3_8B_INSTRUCT_TURBO, LLAMA_VISION_FREE, LLAVA_NEXT_MISTRAL_7B,
33 |     MISTRAL_7B_INSTRUCT_V0_1, MISTRAL_7B_INSTRUCT_V0_2, MISTRAL_7B_INSTRUCT_V0_3,
34 |     MIXTRAL_8X22B_INSTRUCT_V0_1, MIXTRAL_8X7B_INSTRUCT_V0_1, ML318BR, MYTHOMAX_L2_13B,
35 |     MYTHOMAX_L2_13B_LITE, NOUS_CAPYBARA_V1_9, NOUS_HERMES_2_MISTRAL_DPO,
36 |     NOUS_HERMES_2_MIXTRAL_8X7B_DPO, NOUS_HERMES_2_MIXTRAL_8X7B_SFT, NOUS_HERMES_LLAMA2_13B,
37 |     NOUS_HERMES_LLAMA2_70B, NOUS_HERMES_LLAMA2_7B, OLMO_7B_INSTRUCT, OPENCHAT_3_5,
38 |     OPENHERMES_2_5_MISTRAL_7B, OPENHERMES_2_MISTRAL_7B, OPENORCA_MISTRAL_7B_8K,
39 |     PLATYPUS2_70B_INSTRUCT, QWEN1_5_0_5B_CHAT, QWEN1_5_110B_CHAT, QWEN1_5_14B_CHAT,
40 |     QWEN1_5_1_8B_CHAT, QWEN1_5_32B_CHAT, QWEN1_5_4B_CHAT, QWEN1_5_72B_CHAT, QWEN1_5_7B_CHAT,
41 |     QWEN2_5_72B_INSTRUCT_TURBO, QWEN2_5_7B_INSTRUCT_TURBO, QWEN_2_1_5B_INSTRUCT,
42 |     QWEN_2_72B_INSTRUCT, QWEN_2_7B_INSTRUCT, REMM_SLERP_L2_13B, SNORKEL_MISTRAL_PAIRRM_DPO,
43 |     SNOWFLAKE_ARCTIC_INSTRUCT, SOLAR_10_7B_INSTRUCT_V1, SOLAR_10_7B_INSTRUCT_V1_INT4, TOPPY_M_7B,
44 |     VICUNA_13B_V1_3, VICUNA_13B_V1_5, VICUNA_13B_V1_5_16K, VICUNA_7B_V1_3, VICUNA_7B_V1_5,
45 |     WIZARDLM_13B_V1_2, WIZARDLM_2_8X22B, YI_34B_CHAT, ZEPHYR_7B_BETA,
46 | };
47 | pub use embedding::{
48 |     BERT_BASE_UNCASED, BGE_BASE_EN_V1_5, BGE_LARGE_EN_V1_5, M2_BERT_2K_RETRIEVAL_ENCODER_V1,
49 |     M2_BERT_80M_2K_RETRIEVAL, M2_BERT_80M_32K_RETRIEVAL, M2_BERT_80M_8K_RETRIEVAL, SENTENCE_BERT,
50 |     UAE_LARGE_V1,
51 | };
52 | 


--------------------------------------------------------------------------------
/rig-core/src/providers/together/streaming.rs:
--------------------------------------------------------------------------------
 1 | use serde_json::json;
 2 | 
 3 | use super::completion::CompletionModel;
 4 | use crate::providers::openai::send_compatible_streaming_request;
 5 | use crate::{
 6 |     completion::{CompletionError, CompletionRequest},
 7 |     json_utils::merge,
 8 |     streaming::{StreamingCompletionModel, StreamingResult},
 9 | };
10 | 
11 | impl StreamingCompletionModel for CompletionModel {
12 |     async fn stream(
13 |         &self,
14 |         completion_request: CompletionRequest,
15 |     ) -> Result<StreamingResult, CompletionError> {
16 |         let mut request = self.create_completion_request(completion_request)?;
17 | 
18 |         request = merge(request, json!({"stream_tokens": true}));
19 | 
20 |         let builder = self.client.post("/v1/chat/completions").json(&request);
21 | 
22 |         send_compatible_streaming_request(builder).await
23 |     }
24 | }
25 | 


--------------------------------------------------------------------------------
/rig-core/src/providers/xai/mod.rs:
--------------------------------------------------------------------------------
 1 | //! xAi API client and Rig integration
 2 | //!
 3 | //! # Example
 4 | //! ```
 5 | //! use rig::providers::xai;
 6 | //!
 7 | //! let client = xai::Client::new("YOUR_API_KEY");
 8 | //!
 9 | //! let groq_embedding_model = client.embedding_model(xai::v1);
10 | //! ```
11 | 
12 | pub mod client;
13 | pub mod completion;
14 | pub mod embedding;
15 | pub mod streaming;
16 | 
17 | pub use client::Client;
18 | pub use completion::GROK_BETA;
19 | pub use embedding::EMBEDDING_V1;
20 | 


--------------------------------------------------------------------------------
/rig-core/src/providers/xai/streaming.rs:
--------------------------------------------------------------------------------
 1 | use crate::completion::{CompletionError, CompletionRequest};
 2 | use crate::json_utils::merge;
 3 | use crate::providers::openai::send_compatible_streaming_request;
 4 | use crate::providers::xai::completion::CompletionModel;
 5 | use crate::streaming::{StreamingCompletionModel, StreamingResult};
 6 | use serde_json::json;
 7 | 
 8 | impl StreamingCompletionModel for CompletionModel {
 9 |     async fn stream(
10 |         &self,
11 |         completion_request: CompletionRequest,
12 |     ) -> Result<StreamingResult, CompletionError> {
13 |         let mut request = self.create_completion_request(completion_request)?;
14 | 
15 |         request = merge(request, json!({"stream": true}));
16 | 
17 |         let builder = self.client.post("/v1/chat/completions").json(&request);
18 | 
19 |         send_compatible_streaming_request(builder).await
20 |     }
21 | }
22 | 


--------------------------------------------------------------------------------
/rig-core/tests/data/dummy.epub:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/0xPlaygrounds/rig/88edab96b5466b26330d34af8d8e8af107acf491/rig-core/tests/data/dummy.epub


--------------------------------------------------------------------------------
https://raw.githubusercontent.com/0xPlaygrounds/rig/88edab96b5466b26330d34af8d8e8af107acf491/rig-core/tests/data/dummy.pdf


--------------------------------------------------------------------------------
https://raw.githubusercontent.com/0xPlaygrounds/rig/88edab96b5466b26330d34af8d8e8af107acf491/rig-core/tests/data/pages.pdf


--------------------------------------------------------------------------------
/rig-eternalai/CHANGELOG.md:
--------------------------------------------------------------------------------
 1 | # Changelog
 2 | 
 3 | All notable changes to this project will be documented in this file.
 4 | 
 5 | The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
 6 | and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
 7 | 
 8 | ## [Unreleased]
 9 | 
10 | ## [0.2.4](https://github.com/0xPlaygrounds/rig/compare/rig-eternalai-v0.2.3...rig-eternalai-v0.2.4) - 2025-03-31
11 | 
12 | ### Other
13 | 
14 | - updated the following local packages: rig-core
15 | 
16 | ## [0.2.3](https://github.com/0xPlaygrounds/rig/compare/rig-eternalai-v0.2.2...rig-eternalai-v0.2.3) - 2025-03-17
17 | 
18 | ### Added
19 | 
20 | - add reqwest/rustls-tls support ([#339](https://github.com/0xPlaygrounds/rig/pull/339))
21 | 
22 | ## [0.2.2](https://github.com/0xPlaygrounds/rig/compare/rig-eternalai-v0.2.1...rig-eternalai-v0.2.2) - 2025-03-03
23 | 
24 | ### Other
25 | 
26 | - updated the following local packages: rig-core
27 | 
28 | ## [0.2.1](https://github.com/0xPlaygrounds/rig/compare/rig-eternalai-v0.2.0...rig-eternalai-v0.2.1) - 2025-02-17
29 | 
30 | ### Other
31 | 
32 | - updated the following local packages: rig-core
33 | 
34 | ## [0.2.0](https://github.com/0xPlaygrounds/rig/compare/rig-eternalai-v0.1.0...rig-eternalai-v0.2.0) - 2025-02-10
35 | 
36 | ### Added
37 | 
38 | - *(core)* overhaul message API (#199)
39 | 
40 | ### Other
41 | 
42 | - fix typos (#242)
43 | 
44 | ## [0.1.0](https://github.com/0xPlaygrounds/rig/releases/tag/rig-eternalai-v0.1.0) - 2025-01-27
45 | 
46 | ### Added
47 | 
48 | - *(rig-eternalai)* add support for EternalAI onchain toolset (#205)
49 | 
50 | ### Fixed
51 | 
52 | - Use of deprecated `prelude` module (#241)
53 | 
54 | ### Other
55 | 
56 | - *(rig-eternalai)* Add missing manifest fields + basic README (#240)
57 | 


--------------------------------------------------------------------------------
/rig-eternalai/Cargo.toml:
--------------------------------------------------------------------------------
 1 | [package]
 2 | name = "rig-eternalai"
 3 | version = "0.2.4"
 4 | edition = "2021"
 5 | license = "MIT"
 6 | readme = "README.md"
 7 | description = "EternalAI model provider Rig integration."
 8 | repository = "https://github.com/0xPlaygrounds/rig"
 9 | 
10 | [dependencies]
11 | rig-core = { path = "../rig-core", version = "0.11.0" }
12 | ethers = "2.0.14"
13 | reqwest = { version = "0.12.12", features = ["json"] }
14 | serde = { version = "1.0.193", features = ["derive"] }
15 | serde_json = "1.0.108"
16 | tracing = "0.1.40"
17 | schemars = "0.8.16"
18 | 
19 | [dev-dependencies]
20 | anyhow = "1.0.75"
21 | tokio = { version = "1.34.0", features = ["full"] }
22 | tracing-subscriber = "0.3.18"
23 | 


--------------------------------------------------------------------------------
/rig-eternalai/README.md:
--------------------------------------------------------------------------------
 1 | ## Rig-EternalAI
 2 | This companion crate integrates EternalAI and their blockchain capabilities with Rig.
 3 | 
 4 | ## Usage
 5 | 
 6 | Add the companion crate to your `Cargo.toml`, along with the rig-core crate:
 7 | 
 8 | ```toml
 9 | [dependencies]
10 | rig-eternalai = "0.1.0"
11 | rig-core = "0.4.0"
12 | ```
13 | 
14 | You can also run `cargo add rig-eternalai rig-core` to add the most recent versions of the dependencies to your project.
15 | 
16 | See the [`/examples`](./examples) folder for usage examples.
17 | 


--------------------------------------------------------------------------------
/rig-eternalai/examples/agent_with_eternalai.rs:
--------------------------------------------------------------------------------
 1 | use rig::agent::AgentBuilder;
 2 | use rig::completion::Prompt;
 3 | use rig_eternalai::providers::eternalai::{
 4 |     Client, CompletionModel, NOUS_RESEARCH_HERMES_3_LLAMA_3_1_70B_FP8,
 5 | };
 6 | 
 7 | #[tokio::main]
 8 | async fn main() -> Result<(), anyhow::Error> {
 9 |     tracing_subscriber::fmt()
10 |         .with_max_level(tracing::Level::DEBUG)
11 |         .init();
12 |     println!("Running basic agent with eternalai");
13 |     basic_eternalai().await?;
14 | 
15 |     println!("\nRunning eternalai agent with context");
16 |     context_eternalai().await?;
17 | 
18 |     println!("\n\nAll agents ran successfully");
19 |     Ok(())
20 | }
21 | 
22 | fn client() -> Client {
23 |     Client::from_env()
24 | }
25 | 
26 | fn partial_agent_eternalai() -> AgentBuilder<CompletionModel> {
27 |     let client = client();
28 |     client.agent(
29 |         NOUS_RESEARCH_HERMES_3_LLAMA_3_1_70B_FP8,
30 |         // Option::from("45762"),
31 |         None,
32 |     )
33 | }
34 | 
35 | async fn basic_eternalai() -> Result<(), anyhow::Error> {
36 |     let comedian_agent = partial_agent_eternalai()
37 |         .preamble("You are a comedian here to entertain the user using humour and jokes.")
38 |         .build();
39 | 
40 |     // Prompt the agent and print the response
41 |     let response = comedian_agent.prompt("Entertain me!").await?;
42 |     println!("{}", response);
43 | 
44 |     Ok(())
45 | }
46 | 
47 | async fn context_eternalai() -> Result<(), anyhow::Error> {
48 |     let model = client().completion_model(
49 |         NOUS_RESEARCH_HERMES_3_LLAMA_3_1_70B_FP8,
50 |         Option::from("45762"),
51 |         // None,
52 |     );
53 | 
54 |     // Create an agent with multiple context documents
55 |     let agent = AgentBuilder::new(model)
56 |         .context("Definition of a *flurbo*: A flurbo is a green alien that lives on cold planets")
57 |         .context("Definition of a *glarb-glarb*: A glarb-glarb is a ancient tool used by the ancestors of the inhabitants of planet Jiro to farm the land.")
58 |         .context("Definition of a *linglingdong*: A term used by inhabitants of the far side of the moon to describe humans.")
59 |         .build();
60 | 
61 |     // Prompt the agent and print the response
62 |     let response = agent.prompt("What does \"glarb-glarb\" mean?").await?;
63 | 
64 |     println!("{}", response);
65 | 
66 |     Ok(())
67 | }
68 | 


--------------------------------------------------------------------------------
/rig-eternalai/src/eternalai_system_prompt_manager_toolset.rs:
--------------------------------------------------------------------------------
 1 | use ethers::prelude::*;
 2 | use reqwest::get;
 3 | use std::ffi::c_uint;
 4 | use std::sync::Arc;
 5 | 
 6 | const IPFS: &str = "ipfs://";
 7 | const LIGHTHOUSE_IPFS: &str = "https://gateway.lighthouse.storage/ipfs/";
 8 | const GCS_ETERNAL_AI_BASE_URL: &str = "https://cdn.eternalai.org/upload/";
 9 | 
10 | pub async fn fetch_system_prompt_raw_or_ipfs(content: &str) -> Option<String> {
11 |     if content.contains(IPFS) {
12 |         let light_house = content.replace(IPFS, LIGHTHOUSE_IPFS);
13 |         tracing::debug!("light_house : {}", light_house);
14 |         let mut response = get(light_house).await.unwrap();
15 |         if response.status().is_success() {
16 |             let body = response.text().await.unwrap();
17 |             tracing::debug!("light_house body: {}", body);
18 |             return Some(body);
19 |         } else {
20 |             let gcs = content.replace(IPFS, GCS_ETERNAL_AI_BASE_URL);
21 |             tracing::debug!("gcs: {}", gcs);
22 |             response = get(gcs).await.unwrap();
23 |             if response.status().is_success() {
24 |                 let body = response.text().await.unwrap();
25 |                 tracing::debug!("gcs body: {}", body);
26 |                 return Some(body);
27 |             } else {
28 |                 return None;
29 |             }
30 |         }
31 |     }
32 |     Some(content.to_string())
33 | }
34 | 
35 | pub async fn get_on_chain_system_prompt(
36 |     rpc_url: &str,
37 |     contract_addr: &str,
38 |     agent_id: c_uint,
39 | ) -> Result<Option<String>, String> {
40 |     abigen!(
41 |         SystemPromptManagementContract,
42 |         r#"
43 |         [{"inputs": [{"internalType": "uint256", "name": "_agentId", "type": "uint256"}], "name": "getAgentSystemPrompt", "outputs": [{"internalType": "bytes[]", "name": "","type": "bytes[]"}], "stateMutability": "view", "type": "function"}]
44 |         "#
45 |     );
46 |     let provider =
47 |         Provider::<Http>::try_from(rpc_url).map_err(|e| format!("Failed to parse url: {}", e))?;
48 |     let client = Arc::new(provider);
49 |     let contract_address: Address = contract_addr
50 |         .parse()
51 |         .map_err(|e| format!("invalid contract address: {}", e))?;
52 |     let contract = SystemPromptManagementContract::new(contract_address, client);
53 |     let system_prompts: Vec<Bytes> = contract
54 |         .get_agent_system_prompt(U256::from(agent_id))
55 |         .call()
56 |         .await
57 |         .map_err(|e| format!("invalid agent system prompt: {}", e))?;
58 | 
59 |     let decoded_strings: Vec<String> = system_prompts
60 |         .iter()
61 |         .map(|bytes| {
62 |             String::from_utf8(bytes.to_vec()).unwrap_or_else(|_| "[Invalid UTF-8]".to_string())
63 |         })
64 |         .collect();
65 | 
66 |     if !decoded_strings.is_empty() {
67 |         let prompt = decoded_strings[0].clone();
68 |         tracing::debug!("system prompt : {}", prompt);
69 |         return Ok(fetch_system_prompt_raw_or_ipfs(&prompt).await);
70 |     }
71 |     Ok(None)
72 | }
73 | 


--------------------------------------------------------------------------------
/rig-eternalai/src/json_utils.rs:
--------------------------------------------------------------------------------
 1 | pub fn merge(a: serde_json::Value, b: serde_json::Value) -> serde_json::Value {
 2 |     match (a, b) {
 3 |         (serde_json::Value::Object(mut a_map), serde_json::Value::Object(b_map)) => {
 4 |             b_map.into_iter().for_each(|(key, value)| {
 5 |                 a_map.insert(key, value);
 6 |             });
 7 |             serde_json::Value::Object(a_map)
 8 |         }
 9 |         (a, _) => a,
10 |     }
11 | }
12 | 
13 | pub fn merge_inplace(a: &mut serde_json::Value, b: serde_json::Value) {
14 |     if let (serde_json::Value::Object(a_map), serde_json::Value::Object(b_map)) = (a, b) {
15 |         b_map.into_iter().for_each(|(key, value)| {
16 |             a_map.insert(key, value);
17 |         });
18 |     }
19 | }
20 | 


--------------------------------------------------------------------------------
/rig-eternalai/src/lib.rs:
--------------------------------------------------------------------------------
1 | pub mod eternalai_system_prompt_manager_toolset;
2 | pub mod providers;
3 | 
4 | pub mod json_utils;
5 | // pub mod completion;
6 | 


--------------------------------------------------------------------------------
/rig-eternalai/src/providers/mod.rs:
--------------------------------------------------------------------------------
1 | pub mod eternalai;
2 | 


--------------------------------------------------------------------------------
/rig-fastembed/.gitignore:
--------------------------------------------------------------------------------
1 | .fastembed_cache
2 | 


--------------------------------------------------------------------------------
/rig-fastembed/CHANGELOG.md:
--------------------------------------------------------------------------------
 1 | # Changelog
 2 | 
 3 | All notable changes to this project will be documented in this file.
 4 | 
 5 | The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
 6 | and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
 7 | 
 8 | ## [Unreleased]
 9 | 
10 | ## [0.1.4](https://github.com/0xPlaygrounds/rig/compare/rig-fastembed-v0.1.3...rig-fastembed-v0.1.4) - 2025-03-31
11 | 
12 | ### Added
13 | 
14 | - *(rig-fastembed)* support loading model files from custom path ([#337](https://github.com/0xPlaygrounds/rig/pull/337))
15 | 
16 | ## [0.1.3](https://github.com/0xPlaygrounds/rig/compare/rig-fastembed-v0.1.2...rig-fastembed-v0.1.3) - 2025-03-17
17 | 
18 | ### Other
19 | 
20 | - updated the following local packages: rig-core
21 | 
22 | ## [0.1.2](https://github.com/0xPlaygrounds/rig/compare/rig-fastembed-v0.1.1...rig-fastembed-v0.1.2) - 2025-03-03
23 | 
24 | ### Other
25 | 
26 | - updated the following local packages: rig-core
27 | 
28 | ## [0.1.1](https://github.com/0xPlaygrounds/rig/compare/rig-fastembed-v0.1.0...rig-fastembed-v0.1.1) - 2025-02-17
29 | 
30 | ### Other
31 | 
32 | - release (#257)
33 | 
34 | ## [0.1.0](https://github.com/0xPlaygrounds/rig/releases/tag/rig-fastembed-v0.1.0) - 2025-02-10
35 | 
36 | ### Added
37 | 
38 | - fastembed integration (#268)
39 | 
40 | ### Fixed
41 | 
42 | - *(rig-fastembed)* crate info (#294)
43 | 


--------------------------------------------------------------------------------
/rig-fastembed/Cargo.toml:
--------------------------------------------------------------------------------
 1 | [package]
 2 | name = "rig-fastembed"
 3 | version = "0.1.4"
 4 | edition = "2021"
 5 | license = "MIT"
 6 | readme = "README.md"
 7 | description = "Rig vector store index integration for Fastembed. https://github.com/Anush008/fastembed-rs"
 8 | repository = "https://github.com/0xPlaygrounds/rig"
 9 | 
10 | [dependencies]
11 | rig-core = { path = "../rig-core", version = "0.11.0" }
12 | serde = { version = "1.0.193", features = ["derive"] }
13 | serde_json = "1.0.108"
14 | tracing = "0.1.40"
15 | schemars = "0.8.16"
16 | fastembed = "4.4.0"
17 | 
18 | [dev-dependencies]
19 | anyhow = "1.0.75"
20 | tokio = { version = "1.34.0", features = ["full"] }
21 | 
22 | [[example]]
23 | name = "vector_search"
24 | required-features = ["rig-core/derive"]
25 | 
26 | [[example]]
27 | name = "vector_search_local"
28 | required-features = ["rig-core/derive"]
29 | 


--------------------------------------------------------------------------------
/rig-fastembed/README.md:
--------------------------------------------------------------------------------
1 | ## Fastembed integration with Rig
2 | This crate allows you to use [`fastembed-rs`](https://github.com/Anush008/fastembed-rs) with Rig.
3 | 
4 | Unlike the providers found in the core crate, `fastembed` does not compile to the `wasm32-unknown-unknown` target.
5 | 


--------------------------------------------------------------------------------
/rig-fastembed/examples/vector_search.rs:
--------------------------------------------------------------------------------
 1 | use rig::{
 2 |     embeddings::EmbeddingsBuilder,
 3 |     vector_store::{in_memory_store::InMemoryVectorStore, VectorStoreIndex},
 4 |     Embed,
 5 | };
 6 | use rig_fastembed::FastembedModel;
 7 | use serde::{Deserialize, Serialize};
 8 | 
 9 | // Shape of data that needs to be RAG'ed.
10 | // The definition field will be used to generate embeddings.
11 | #[derive(Embed, Clone, Deserialize, Debug, Serialize, Eq, PartialEq, Default)]
12 | struct WordDefinition {
13 |     id: String,
14 |     word: String,
15 |     #[embed]
16 |     definitions: Vec<String>,
17 | }
18 | 
19 | #[tokio::main]
20 | async fn main() -> Result<(), anyhow::Error> {
21 |     // Create OpenAI client
22 |     let fastembed_client = rig_fastembed::Client::new();
23 | 
24 |     let embedding_model = fastembed_client.embedding_model(&FastembedModel::AllMiniLML6V2Q);
25 | 
26 |     let embeddings = EmbeddingsBuilder::new(embedding_model.clone())
27 |         .documents(vec![
28 |             WordDefinition {
29 |                 id: "doc0".to_string(),
30 |                 word: "flurbo".to_string(),
31 |                 definitions: vec![
32 |                     "A green alien that lives on cold planets.".to_string(),
33 |                     "A fictional digital currency that originated in the animated series Rick and Morty.".to_string()
34 |                 ]
35 |             },
36 |             WordDefinition {
37 |                 id: "doc1".to_string(),
38 |                 word: "glarb-glarb".to_string(),
39 |                 definitions: vec![
40 |                     "An ancient tool used by the ancestors of the inhabitants of planet Jiro to farm the land.".to_string(),
41 |                     "A fictional creature found in the distant, swampy marshlands of the planet Glibbo in the Andromeda galaxy.".to_string()
42 |                 ]
43 |             },
44 |             WordDefinition {
45 |                 id: "doc2".to_string(),
46 |                 word: "linglingdong".to_string(),
47 |                 definitions: vec![
48 |                     "A term used by inhabitants of the sombrero galaxy to describe humans.".to_string(),
49 |                     "A rare, mystical instrument crafted by the ancient monks of the Nebulon Mountain Ranges on the planet Quarm.".to_string()
50 |                 ]
51 |             },
52 |         ])?
53 |         .build()
54 |         .await?;
55 | 
56 |     // Create vector store with the embeddings
57 |     let vector_store =
58 |         InMemoryVectorStore::from_documents_with_id_f(embeddings, |doc| doc.id.clone());
59 | 
60 |     // Create vector store index
61 |     let index = vector_store.index(embedding_model);
62 | 
63 |     let results = index
64 |         .top_n::<WordDefinition>("I need to buy something in a fictional universe. What type of money can I use for this?", 1)
65 |         .await?
66 |         .into_iter()
67 |         .map(|(score, id, doc)| (score, id, doc.word))
68 |         .collect::<Vec<_>>();
69 | 
70 |     println!("Results: {:?}", results);
71 | 
72 |     let id_results = index
73 |         .top_n_ids("I need to buy something in a fictional universe. What type of money can I use for this?", 1)
74 |         .await?
75 |         .into_iter()
76 |         .collect::<Vec<_>>();
77 | 
78 |     println!("ID results: {:?}", id_results);
79 | 
80 |     Ok(())
81 | }
82 | 


--------------------------------------------------------------------------------
/rig-lancedb/Cargo.toml:
--------------------------------------------------------------------------------
 1 | [package]
 2 | name = "rig-lancedb"
 3 | version = "0.2.8"
 4 | edition = "2021"
 5 | license = "MIT"
 6 | readme = "README.md"
 7 | description = "Rig vector store index integration for LanceDB."
 8 | repository = "https://github.com/0xPlaygrounds/rig"
 9 | 
10 | [dependencies]
11 | lancedb = "0.18.1"
12 | rig-core = { path = "../rig-core", version = "0.11.0" }
13 | arrow-array = "54.2.1"
14 | serde_json = "1.0.128"
15 | serde = "1.0.210"
16 | futures = "0.3.30"
17 | 
18 | # https://github.com/jhpratt/deranged/issues/18
19 | deranged = "=0.4.0"
20 | 
21 | [dev-dependencies]
22 | tokio = "1.40.0"
23 | anyhow = "1.0.89"
24 | httpmock = "0.7.0"
25 | 
26 | [[example]]
27 | name = "vector_search_local_ann"
28 | required-features = ["rig-core/derive"]
29 | 
30 | [[example]]
31 | name = "vector_search_local_enn"
32 | required-features = ["rig-core/derive"]
33 | 
34 | [[example]]
35 | name = "vector_search_s3_ann"
36 | required-features = ["rig-core/derive"]
37 | 
38 | [[test]]
39 | name = "integration_tests"
40 | required-features = ["rig-core/derive"]
41 | 


--------------------------------------------------------------------------------
/rig-lancedb/LICENSE:
--------------------------------------------------------------------------------
1 | Copyright (c) 2024, Playgrounds Analytics Inc.
2 | 
3 | Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
4 | 
5 | The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
6 | 
7 | THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
8 | 


--------------------------------------------------------------------------------
/rig-lancedb/README.md:
--------------------------------------------------------------------------------
 1 | <!-- <div style="display: flex; align-items: center; justify-content: center;">
 2 |     <picture>
 3 |         <source media="(prefers-color-scheme: dark)" srcset="../img/rig_logo_dark.svg">
 4 |         <source media="(prefers-color-scheme: light)" srcset="../img/rig_logo.svg">
 5 |         <img src="../img/rig_logo.svg" width="200" alt="Rig logo">
 6 |     </picture>
 7 |     <span style="font-size: 48px; margin: 0 20px; font-weight: regular; font-family: Open Sans, sans-serif;"> + </span>
 8 |     <picture>
 9 |         <source media="(prefers-color-scheme: dark)" srcset="https://companieslogo.com/img/orig/MDB_BIG.D-96d632a9.png?t=1720244492">
10 |         <source media="(prefers-color-scheme: light)" srcset="https://cdn.iconscout.com/icon/free/png-256/free-mongodb-logo-icon-download-in-svg-png-gif-file-formats--wordmark-programming-langugae-freebies-pack-logos-icons-1175140.png?f=webp&w=256">
11 |         <img src="https://cdn.iconscout.com/icon/free/png-256/free-mongodb-logo-icon-download-in-svg-png-gif-file-formats--wordmark-programming-langugae-freebies-pack-logos-icons-1175140.png?f=webp&w=256" width="200" alt="MongoDB logo">
12 |     </picture>
13 | </div>
14 | 
15 | <br><br> -->
16 | 
17 | ## Rig-Lancedb
18 | This companion crate implements a Rig vector store based on Lancedb.
19 | 
20 | ## Usage
21 | 
22 | Add the companion crate to your `Cargo.toml`, along with the rig-core crate:
23 | 
24 | ```toml
25 | [dependencies]
26 | rig-lancedb = "0.1.0"
27 | rig-core = "0.4.0"
28 | ```
29 | 
30 | You can also run `cargo add rig-lancedb rig-core` to add the most recent versions of the dependencies to your project.
31 | 
32 | See the [`/examples`](./examples) folder for usage examples.
33 | 


--------------------------------------------------------------------------------
/rig-lancedb/examples/fixtures/lib.rs:
--------------------------------------------------------------------------------
 1 | use std::sync::Arc;
 2 | 
 3 | use arrow_array::{types::Float64Type, ArrayRef, FixedSizeListArray, RecordBatch, StringArray};
 4 | use lancedb::arrow::arrow_schema::{DataType, Field, Fields, Schema};
 5 | use rig::embeddings::Embedding;
 6 | use rig::{Embed, OneOrMany};
 7 | use serde::Deserialize;
 8 | 
 9 | #[derive(Embed, Clone, Deserialize, Debug)]
10 | pub struct Word {
11 |     pub id: String,
12 |     #[embed]
13 |     pub definition: String,
14 | }
15 | 
16 | pub fn words() -> Vec<Word> {
17 |     vec![
18 |         Word {
19 |             id: "doc0".to_string(),
20 |             definition: "Definition of *flumbrel (noun)*: a small, seemingly insignificant item that you constantly lose or misplace, such as a pen, hair tie, or remote control.".to_string()
21 |         },
22 |         Word {
23 |             id: "doc1".to_string(),
24 |             definition: "Definition of *zindle (verb)*: to pretend to be working on something important while actually doing something completely unrelated or unproductive.".to_string()
25 |         },
26 |         Word {
27 |             id: "doc2".to_string(),
28 |             definition: "Definition of a *linglingdong*: A term used by inhabitants of the far side of the moon to describe humans.".to_string()
29 |         }
30 |     ]
31 | }
32 | 
33 | // Schema of table in LanceDB.
34 | pub fn schema(dims: usize) -> Schema {
35 |     Schema::new(Fields::from(vec![
36 |         Field::new("id", DataType::Utf8, false),
37 |         Field::new("definition", DataType::Utf8, false),
38 |         Field::new(
39 |             "embedding",
40 |             DataType::FixedSizeList(
41 |                 Arc::new(Field::new("item", DataType::Float64, true)),
42 |                 dims as i32,
43 |             ),
44 |             false,
45 |         ),
46 |     ]))
47 | }
48 | 
49 | // Convert Word objects and their embedding to a RecordBatch.
50 | pub fn as_record_batch(
51 |     records: Vec<(Word, OneOrMany<Embedding>)>,
52 |     dims: usize,
53 | ) -> Result<RecordBatch, lancedb::arrow::arrow_schema::ArrowError> {
54 |     let id = StringArray::from_iter_values(
55 |         records
56 |             .iter()
57 |             .map(|(Word { id, .. }, _)| id)
58 |             .collect::<Vec<_>>(),
59 |     );
60 | 
61 |     let definition = StringArray::from_iter_values(
62 |         records
63 |             .iter()
64 |             .map(|(Word { definition, .. }, _)| definition)
65 |             .collect::<Vec<_>>(),
66 |     );
67 | 
68 |     let embedding = FixedSizeListArray::from_iter_primitive::<Float64Type, _, _>(
69 |         records
70 |             .into_iter()
71 |             .map(|(_, embeddings)| {
72 |                 Some(
73 |                     embeddings
74 |                         .first()
75 |                         .vec
76 |                         .into_iter()
77 |                         .map(Some)
78 |                         .collect::<Vec<_>>(),
79 |                 )
80 |             })
81 |             .collect::<Vec<_>>(),
82 |         dims as i32,
83 |     );
84 | 
85 |     RecordBatch::try_from_iter(vec![
86 |         ("id", Arc::new(id) as ArrayRef),
87 |         ("definition", Arc::new(definition) as ArrayRef),
88 |         ("embedding", Arc::new(embedding) as ArrayRef),
89 |     ])
90 | }
91 | 


--------------------------------------------------------------------------------
/rig-lancedb/examples/vector_search_local_ann.rs:
--------------------------------------------------------------------------------
 1 | use std::sync::Arc;
 2 | 
 3 | use arrow_array::RecordBatchIterator;
 4 | use fixture::{as_record_batch, schema, words, Word};
 5 | use lancedb::index::vector::IvfPqIndexBuilder;
 6 | use rig::{
 7 |     embeddings::{EmbeddingModel, EmbeddingsBuilder},
 8 |     providers::openai::{Client, TEXT_EMBEDDING_ADA_002},
 9 |     vector_store::VectorStoreIndex,
10 | };
11 | use rig_lancedb::{LanceDbVectorIndex, SearchParams};
12 | 
13 | #[path = "./fixtures/lib.rs"]
14 | mod fixture;
15 | 
16 | #[tokio::main]
17 | async fn main() -> Result<(), anyhow::Error> {
18 |     // Initialize OpenAI client. Use this to generate embeddings (and generate test data for RAG demo).
19 |     let openai_client = Client::from_env();
20 | 
21 |     // Select an embedding model.
22 |     let model = openai_client.embedding_model(TEXT_EMBEDDING_ADA_002);
23 | 
24 |     // Initialize LanceDB locally.
25 |     let db = lancedb::connect("data/lancedb-store").execute().await?;
26 | 
27 |     // Generate embeddings for the test data.
28 |     let embeddings = EmbeddingsBuilder::new(model.clone())
29 |         .documents(words())?
30 |         // Note: need at least 256 rows in order to create an index so copy the definition 256 times for testing purposes.
31 |         .documents(
32 |             (0..256)
33 |                 .map(|i| Word {
34 |                     id: format!("doc{}", i),
35 |                     definition: "Definition of *flumbuzzle (noun)*: A sudden, inexplicable urge to rearrange or reorganize small objects, such as desk items or books, for no apparent reason.".to_string()
36 |                 })
37 |         )?
38 |         .build()
39 |         .await?;
40 | 
41 |     let table = db
42 |         .create_table(
43 |             "definitions",
44 |             RecordBatchIterator::new(
45 |                 vec![as_record_batch(embeddings, model.ndims())],
46 |                 Arc::new(schema(model.ndims())),
47 |             ),
48 |         )
49 |         .execute()
50 |         .await?;
51 | 
52 |     // See [LanceDB indexing](https://lancedb.github.io/lancedb/concepts/index_ivfpq/#product-quantization) for more information
53 |     table
54 |         .create_index(
55 |             &["embedding"],
56 |             lancedb::index::Index::IvfPq(IvfPqIndexBuilder::default()),
57 |         )
58 |         .execute()
59 |         .await?;
60 | 
61 |     // Define search_params params that will be used by the vector store to perform the vector search.
62 |     let search_params = SearchParams::default();
63 |     let vector_store_index = LanceDbVectorIndex::new(table, model, "id", search_params).await?;
64 | 
65 |     // Query the index
66 |     let results = vector_store_index
67 |         .top_n::<Word>("My boss says I zindle too much, what does that mean?", 1)
68 |         .await?;
69 | 
70 |     println!("Results: {:?}", results);
71 | 
72 |     Ok(())
73 | }
74 | 


--------------------------------------------------------------------------------
/rig-lancedb/examples/vector_search_local_enn.rs:
--------------------------------------------------------------------------------
 1 | use std::sync::Arc;
 2 | 
 3 | use arrow_array::RecordBatchIterator;
 4 | use fixture::{as_record_batch, schema, words};
 5 | use rig::{
 6 |     embeddings::{EmbeddingModel, EmbeddingsBuilder},
 7 |     providers::openai::{Client, TEXT_EMBEDDING_ADA_002},
 8 |     vector_store::VectorStoreIndexDyn,
 9 | };
10 | use rig_lancedb::{LanceDbVectorIndex, SearchParams};
11 | 
12 | #[path = "./fixtures/lib.rs"]
13 | mod fixture;
14 | 
15 | #[tokio::main]
16 | async fn main() -> Result<(), anyhow::Error> {
17 |     // Initialize OpenAI client. Use this to generate embeddings (and generate test data for RAG demo).
18 |     let openai_client = Client::from_env();
19 | 
20 |     // Select the embedding model and generate our embeddings
21 |     let model = openai_client.embedding_model(TEXT_EMBEDDING_ADA_002);
22 | 
23 |     // Generate embeddings for the test data.
24 |     let embeddings = EmbeddingsBuilder::new(model.clone())
25 |         .documents(words())?
26 |         .build()
27 |         .await?;
28 | 
29 |     // Define search_params params that will be used by the vector store to perform the vector search.
30 |     let search_params = SearchParams::default();
31 | 
32 |     // Initialize LanceDB locally.
33 |     let db = lancedb::connect("data/lancedb-store").execute().await?;
34 | 
35 |     let table = db
36 |         .create_table(
37 |             "definitions",
38 |             RecordBatchIterator::new(
39 |                 vec![as_record_batch(embeddings, model.ndims())],
40 |                 Arc::new(schema(model.ndims())),
41 |             ),
42 |         )
43 |         .execute()
44 |         .await?;
45 | 
46 |     let vector_store = LanceDbVectorIndex::new(table, model, "id", search_params).await?;
47 | 
48 |     // Query the index
49 |     let results = vector_store
50 |         .top_n_ids("My boss says I zindle too much, what does that mean?", 1)
51 |         .await?;
52 | 
53 |     println!("Results: {:?}", results);
54 | 
55 |     Ok(())
56 | }
57 | 


--------------------------------------------------------------------------------
/rig-lancedb/tests/fixtures/lib.rs:
--------------------------------------------------------------------------------
 1 | use std::sync::Arc;
 2 | 
 3 | use arrow_array::{types::Float64Type, ArrayRef, FixedSizeListArray, RecordBatch, StringArray};
 4 | use lancedb::arrow::arrow_schema::{DataType, Field, Fields, Schema};
 5 | use rig::embeddings::Embedding;
 6 | use rig::{Embed, OneOrMany};
 7 | use serde::Deserialize;
 8 | 
 9 | #[derive(Embed, Clone, Deserialize, Debug)]
10 | pub struct Word {
11 |     pub id: String,
12 |     #[embed]
13 |     pub definition: String,
14 | }
15 | 
16 | pub fn words() -> Vec<Word> {
17 |     vec![
18 |         Word {
19 |             id: "doc0".to_string(),
20 |             definition: "Definition of *flumbrel (noun)*: a small, seemingly insignificant item that you constantly lose or misplace, such as a pen, hair tie, or remote control.".to_string()
21 |         },
22 |         Word {
23 |             id: "doc1".to_string(),
24 |             definition: "Definition of *zindle (verb)*: to pretend to be working on something important while actually doing something completely unrelated or unproductive.".to_string()
25 |         },
26 |         Word {
27 |             id: "doc2".to_string(),
28 |             definition: "Definition of a *linglingdong*: A term used by inhabitants of the far side of the moon to describe humans.".to_string()
29 |         }
30 |     ]
31 | }
32 | 
33 | // Schema of table in LanceDB.
34 | pub fn schema(dims: usize) -> Schema {
35 |     Schema::new(Fields::from(vec![
36 |         Field::new("id", DataType::Utf8, false),
37 |         Field::new("definition", DataType::Utf8, false),
38 |         Field::new(
39 |             "embedding",
40 |             DataType::FixedSizeList(
41 |                 Arc::new(Field::new("item", DataType::Float64, true)),
42 |                 dims as i32,
43 |             ),
44 |             false,
45 |         ),
46 |     ]))
47 | }
48 | 
49 | // Convert Word objects and their embedding to a RecordBatch.
50 | pub fn as_record_batch(
51 |     records: Vec<(Word, OneOrMany<Embedding>)>,
52 |     dims: usize,
53 | ) -> Result<RecordBatch, lancedb::arrow::arrow_schema::ArrowError> {
54 |     let id = StringArray::from_iter_values(
55 |         records
56 |             .iter()
57 |             .map(|(Word { id, .. }, _)| id)
58 |             .collect::<Vec<_>>(),
59 |     );
60 | 
61 |     let definition = StringArray::from_iter_values(
62 |         records
63 |             .iter()
64 |             .map(|(Word { definition, .. }, _)| definition)
65 |             .collect::<Vec<_>>(),
66 |     );
67 | 
68 |     let embedding = FixedSizeListArray::from_iter_primitive::<Float64Type, _, _>(
69 |         records
70 |             .into_iter()
71 |             .map(|(_, embeddings)| {
72 |                 Some(
73 |                     embeddings
74 |                         .first()
75 |                         .vec
76 |                         .into_iter()
77 |                         .map(Some)
78 |                         .collect::<Vec<_>>(),
79 |                 )
80 |             })
81 |             .collect::<Vec<_>>(),
82 |         dims as i32,
83 |     );
84 | 
85 |     RecordBatch::try_from_iter(vec![
86 |         ("id", Arc::new(id) as ArrayRef),
87 |         ("definition", Arc::new(definition) as ArrayRef),
88 |         ("embedding", Arc::new(embedding) as ArrayRef),
89 |     ])
90 | }
91 | 


--------------------------------------------------------------------------------
/rig-mongodb/Cargo.toml:
--------------------------------------------------------------------------------
 1 | [package]
 2 | name = "rig-mongodb"
 3 | version = "0.2.8"
 4 | edition = "2021"
 5 | license = "MIT"
 6 | readme = "README.md"
 7 | description = "MongoDB implementation of a Rig vector store."
 8 | repository = "https://github.com/0xPlaygrounds/rig"
 9 | 
10 | # See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html
11 | 
12 | [dependencies]
13 | futures = "0.3.30"
14 | mongodb = "3.1.0"
15 | rig-core = { path = "../rig-core", version = "0.11.0" }
16 | serde = { version = "1.0.203", features = ["derive"] }
17 | serde_json = "1.0.117"
18 | tracing = "0.1.40"
19 | 
20 | [dev-dependencies]
21 | anyhow = "1.0.86"
22 | httpmock = "0.7.0"
23 | testcontainers = "0.23.1"
24 | tokio = { version = "1.38.0", features = ["macros"] }
25 | tokio-test = "0.4.4"
26 | 
27 | [[example]]
28 | name = "vector_search_mongodb"
29 | required-features = ["rig-core/derive"]
30 | 
31 | [[test]]
32 | name = "integration_tests"
33 | required-features = ["rig-core/derive"]
34 | 


--------------------------------------------------------------------------------
/rig-mongodb/LICENSE:
--------------------------------------------------------------------------------
1 | Copyright (c) 2024, Playgrounds Analytics Inc.
2 | 
3 | Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
4 | 
5 | The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
6 | 
7 | THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
8 | 


--------------------------------------------------------------------------------
/rig-mongodb/README.md:
--------------------------------------------------------------------------------
 1 | 
 2 | 
 3 | <div style="display: flex; align-items: center; justify-content: center;">
 4 |     <picture>
 5 |         <source media="(prefers-color-scheme: dark)" srcset="../img/rig_logo_dark.svg">
 6 |         <source media="(prefers-color-scheme: light)" srcset="../img/rig_logo.svg">
 7 |         <img src="../img/rig_logo.svg" width="200" alt="Rig logo">
 8 |     </picture>
 9 |     <span style="font-size: 48px; margin: 0 20px; font-weight: regular; font-family: Open Sans, sans-serif;"> + </span>
10 |     <picture>
11 |         <source media="(prefers-color-scheme: dark)" srcset="https://companieslogo.com/img/orig/MDB_BIG.D-96d632a9.png?t=1720244492">
12 |         <source media="(prefers-color-scheme: light)" srcset="https://cdn.iconscout.com/icon/free/png-256/free-mongodb-logo-icon-download-in-svg-png-gif-file-formats--wordmark-programming-langugae-freebies-pack-logos-icons-1175140.png?f=webp&w=256">
13 |         <img src="https://cdn.iconscout.com/icon/free/png-256/free-mongodb-logo-icon-download-in-svg-png-gif-file-formats--wordmark-programming-langugae-freebies-pack-logos-icons-1175140.png?f=webp&w=256" width="200" alt="MongoDB logo">
14 |     </picture>
15 | </div>
16 | 
17 | <br><br>
18 | 
19 | ## Rig-MongoDB
20 | This companion crate implements a Rig vector store based on MongoDB.
21 | 
22 | ## Usage
23 | 
24 | Add the companion crate to your `Cargo.toml`, along with the rig-core crate:
25 | 
26 | ```toml
27 | [dependencies]
28 | rig-mongodb = "0.1.3"
29 | rig-core = "0.4.0"
30 | ```
31 | 
32 | You can also run `cargo add rig-mongodb rig-core` to add the most recent versions of the dependencies to your project.
33 | 
34 | See the [`/examples`](./examples) folder for usage examples.
35 | 


--------------------------------------------------------------------------------
/rig-neo4j/CHANGELOG.md:
--------------------------------------------------------------------------------
 1 | # Changelog
 2 | 
 3 | All notable changes to this project will be documented in this file.
 4 | 
 5 | The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
 6 | and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
 7 | 
 8 | ## [Unreleased]
 9 | 
10 | ## [0.2.8](https://github.com/0xPlaygrounds/rig/compare/rig-neo4j-v0.2.7...rig-neo4j-v0.2.8) - 2025-03-31
11 | 
12 | ### Other
13 | 
14 | - updated the following local packages: rig-core
15 | 
16 | ## [0.2.7](https://github.com/0xPlaygrounds/rig/compare/rig-neo4j-v0.2.6...rig-neo4j-v0.2.7) - 2025-03-17
17 | 
18 | ### Other
19 | 
20 | - updated the following local packages: rig-core
21 | 
22 | ## [0.2.6](https://github.com/0xPlaygrounds/rig/compare/rig-neo4j-v0.2.5...rig-neo4j-v0.2.6) - 2025-03-03
23 | 
24 | ### Other
25 | 
26 | - updated the following local packages: rig-core
27 | 
28 | ## [0.2.5](https://github.com/0xPlaygrounds/rig/compare/rig-neo4j-v0.2.4...rig-neo4j-v0.2.5) - 2025-02-17
29 | 
30 | ### Other
31 | 
32 | - updated the following local packages: rig-core
33 | 
34 | ## [0.2.4](https://github.com/0xPlaygrounds/rig/compare/rig-neo4j-v0.2.3...rig-neo4j-v0.2.4) - 2025-02-10
35 | 
36 | ### Other
37 | 
38 | - updated the following local packages: rig-core
39 | 
40 | ## [0.2.3](https://github.com/0xPlaygrounds/rig/compare/rig-neo4j-v0.2.2...rig-neo4j-v0.2.3) - 2025-01-27
41 | 
42 | ### Other
43 | 
44 | - Fix typos (#233)
45 | 
46 | ## [0.2.2](https://github.com/0xPlaygrounds/rig/compare/rig-neo4j-v0.2.1...rig-neo4j-v0.2.2) - 2025-01-13
47 | 
48 | ### Other
49 | 
50 | - *(rig-neo4j)* remove old tests (#197)
51 | - *(rig-neo4j)* Fix neo4j integration test (#190)
52 | - Mock provider API in vector store integration tests (#186)
53 | - fix typo
54 | 
55 | ## [0.2.1](https://github.com/0xPlaygrounds/rig/compare/rig-neo4j-v0.2.0...rig-neo4j-v0.2.1) - 2024-12-19
56 | 
57 | ### Other
58 | 
59 | - update Cargo.lock dependencies
60 | 
61 | ## [0.2.0](https://github.com/0xPlaygrounds/rig/compare/rig-neo4j-v0.1.2...rig-neo4j-v0.2.0) - 2024-12-03
62 | 
63 | ### Added
64 | 
65 | - embeddings API overhaul ([#120](https://github.com/0xPlaygrounds/rig/pull/120))
66 | 
67 | ### Fixed
68 | 
69 | - *(neo4j)* remove embeddings from top_n lookup ([#118](https://github.com/0xPlaygrounds/rig/pull/118))
70 | 
71 | ### Other
72 | 
73 | - *(integration test)* Neo4J ([#133](https://github.com/0xPlaygrounds/rig/pull/133))
74 | 
75 | ## [0.1.2](https://github.com/0xPlaygrounds/rig/compare/rig-neo4j-v0.1.1...rig-neo4j-v0.1.2) - 2024-11-13
76 | 
77 | ### Other
78 | 
79 | - updated the following local packages: rig-core
80 | 
81 | ## [0.1.1](https://github.com/0xPlaygrounds/rig/compare/rig-neo4j-v0.1.0...rig-neo4j-v0.1.1) - 2024-11-07
82 | 
83 | ### Fixed
84 | 
85 | - *(neo4j)* last minute doc and const adjustments
86 | 
87 | ## [0.1.0](https://github.com/0xPlaygrounds/rig/compare/rig-mongodb-v0.0.7...rig-mongodb-v0.1.0) - 2024-10-22
88 | 
89 | ### Features
90 | 
91 | - initial implementation
92 | - supports `top_n` search for an existing index and database
93 | 


--------------------------------------------------------------------------------
/rig-neo4j/Cargo.toml:
--------------------------------------------------------------------------------
 1 | [package]
 2 | name = "rig-neo4j"
 3 | version = "0.2.8"
 4 | edition = "2021"
 5 | license = "MIT"
 6 | readme = "README.md"
 7 | description = "Neo4j implementation of a Rig vector store."
 8 | repository = "https://github.com/0xPlaygrounds/rig"
 9 | 
10 | # See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html
11 | 
12 | [dependencies]
13 | futures = "0.3.30"
14 | neo4rs = "0.8.0"
15 | rig-core = { path = "../rig-core", version = "0.11.0" }
16 | serde = { version = "1.0.203", features = ["derive"] }
17 | serde_json = "1.0.117"
18 | tracing = "0.1.40"
19 | 
20 | [dev-dependencies]
21 | anyhow = "1.0.86"
22 | tokio = { version = "1.38.0", features = ["macros"] }
23 | textwrap = { version = "0.16.1"}
24 | term_size = { version = "0.3.2"}
25 | testcontainers = "0.23.1"
26 | tracing-subscriber = "0.3.18"
27 | httpmock = "0.7.0"
28 | 
29 | [[example]]
30 | name = "vector_search_simple"
31 | required-features = ["rig-core/derive"]
32 | 
33 | [[test]]
34 | name = "integration_tests"
35 | required-features = ["rig-core/derive"]
36 | 


--------------------------------------------------------------------------------
/rig-neo4j/LICENSE:
--------------------------------------------------------------------------------
1 | Copyright (c) 2024, Playgrounds Analytics Inc.
2 | 
3 | Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
4 | 
5 | The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
6 | 
7 | THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
8 | 


--------------------------------------------------------------------------------
/rig-neo4j/README.md:
--------------------------------------------------------------------------------
 1 | 
 2 | 
 3 | <div style="display: flex; align-items: center; justify-content: center;">
 4 |     <picture>
 5 |         <source media="(prefers-color-scheme: dark)" srcset="../img/rig_logo_dark.svg">
 6 |         <source media="(prefers-color-scheme: light)" srcset="../img/rig_logo.svg">
 7 |         <img src="../img/rig_logo.svg" width="200" alt="Rig logo">
 8 |     </picture>
 9 |     <span style="font-size: 48px; margin: 0 20px; font-weight: regular; font-family: Open Sans, sans-serif;"> + </span>
10 |     <picture>
11 |         <source media="(prefers-color-scheme: dark)" srcset="https://cdn.prod.website-files.com/653986a9412d138f23c5b8cb/65c3ee6c93dc929503742ff6_1_E5u7PfGGOQ32_H5dUVGerQ%402x.png">
12 |         <source media="(prefers-color-scheme: light)" srcset="https://commons.wikimedia.org/wiki/File:Neo4j-logo_color.png">
13 |         <img src="https://commons.wikimedia.org/wiki/File:Neo4j-logo_color.png" width="200" alt="Neo4j logo">
14 |     </picture>
15 | 
16 | </div>
17 | 
18 | <br><br>
19 | 
20 | This companion crate implements a Rig vector store based on Neo4j Graph database. It uses the [neo4rs](https://github.com/neo4j-labs/neo4rs) crate to interact with Neo4j. Note that the neo4rs crate is a work in progress and does not yet support all Neo4j features. Further documentation on Neo4j & vector search integration can be found on the [neo4rs docs](https://neo4j.com/docs/cypher-manual/current/indexes/semantic-indexes/vector-indexes/).
21 | 
22 | ## Prerequisites
23 | 
24 | The GenAI plugin is enabled by default in Neo4j Aura.
25 | 
26 | The plugin needs to be installed on self-managed instances. This is done by moving the neo4j-genai.jar file from /products to /plugins in the Neo4j home directory, or, if you are using Docker, by starting the Docker container with the extra parameter --env NEO4J_PLUGINS='["genai"]'. For more information, see Operations Manual → Configure plugins.
27 | 
28 | 
29 | ## Usage
30 | 
31 | Add the companion crate to your `Cargo.toml`, along with the rig-core crate:
32 | 
33 | ```toml
34 | [dependencies]
35 | rig-neo4j = "0.1"
36 | ```
37 | 
38 | You can also run `cargo add rig-neo4j rig-core` to add the most recent versions of the dependencies to your project.
39 | 
40 | See the [examples](./examples) folder for usage examples.
41 | 
42 | - [examples/vector_search_simple.rs](examples/vector_search_simple.rs) shows how to create an index on simple data.
43 | - [examples/vector_search_movies_consume.rs](examples/vector_search_movies_consume.rs) shows how to query an existing index.
44 | - [examples/vector_search_movies_create.rs](examples/vector_search_movies_create.rs) shows how to create embeddings & index on a large DB and query it in one go.
45 | 
46 | ## Notes
47 | 
48 | - The `rig-neo4j::vector_index` module offers utility functions to create and query a Neo4j vector index. You can also create indexes using the Neo4j browser or directly call cypther queries with the Neo4rs crate. See the [Neo4j documentation](https://neo4j.com/docs/genai/tutorials/embeddings-vector-indexes/setup/vector-index/) for more information. Example [examples/vector_search_simple.rs](examples/vector_search_simple.rs) shows how to create an index on existing data.
49 | 
50 | ```Cypher
51 | CREATE VECTOR INDEX moviePlots
52 | FOR (m:Movie)
53 | ON m.embedding
54 | OPTIONS {indexConfig: {
55 |     `vector.dimensions`: 1536,
56 |     `vector.similarity_function`: 'cosine'
57 | }}
58 | ```
59 | 
60 | ## Roadmap
61 | 
62 | - Add support for creating the vector index through RIG.
63 | - Add support for adding embeddings to an existing database
64 | - Add support for uploading documents to an existing database
65 | 


--------------------------------------------------------------------------------
/rig-neo4j/examples/display/lib.rs:
--------------------------------------------------------------------------------
 1 | // =====================================================
 2 | // Utilities to print results from a Neo4j vector search
 3 | // =====================================================
 4 | 
 5 | use std::fmt::Display;
 6 | 
 7 | #[allow(dead_code)]
 8 | #[derive(Debug)]
 9 | pub struct SearchResult {
10 |     pub title: String,
11 |     pub id: String,
12 |     pub description: String,
13 |     pub score: f64,
14 | }
15 | 
16 | pub struct SearchResults<'a>(pub &'a Vec<SearchResult>);
17 | 
18 | impl<'a> Display for SearchResults<'a> {
19 |     fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
20 |         let width = term_size::dimensions().map(|(w, _)| w).unwrap_or(150);
21 |         let title_width = 40;
22 |         let id_width = 10;
23 |         let description_width = width - title_width - id_width - 2; // 2 for spaces
24 | 
25 |         writeln!(
26 |             f,
27 |             "{:<title_width$} {:<id_width$} {:<description_width$}",
28 |             "Title", "ID", "Description"
29 |         )?;
30 |         writeln!(f, "{}", "-".repeat(width))?;
31 |         for result in self.0 {
32 |             let wrapped_title = textwrap::fill(&result.title, title_width);
33 |             let wrapped_description = textwrap::fill(&result.description, description_width);
34 |             let title_lines: Vec<&str> = wrapped_title.lines().collect();
35 |             let description_lines: Vec<&str> = wrapped_description.lines().collect();
36 |             let max_lines = title_lines.len().max(description_lines.len());
37 | 
38 |             for i in 0..max_lines {
39 |                 let title_line = title_lines.get(i).unwrap_or(&"");
40 |                 let description_line = description_lines.get(i).unwrap_or(&"");
41 |                 if i == 0 {
42 |                     writeln!(
43 |                         f,
44 |                         "{:<title_width$} {:<id_width$} {:<description_width$}",
45 |                         title_line, result.id, description_line
46 |                     )?;
47 |                 } else {
48 |                     writeln!(
49 |                         f,
50 |                         "{:<title_width$} {:<id_width$} {:<description_width$}",
51 |                         title_line, "", description_line
52 |                     )?;
53 |                 }
54 |             }
55 |         }
56 |         Ok(())
57 |     }
58 | }
59 | 


--------------------------------------------------------------------------------
/rig-postgres/CHANGELOG.md:
--------------------------------------------------------------------------------
 1 | # Changelog
 2 | 
 3 | All notable changes to this project will be documented in this file.
 4 | 
 5 | The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
 6 | and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
 7 | 
 8 | ## [Unreleased]
 9 | 
10 | ## [0.1.6](https://github.com/0xPlaygrounds/rig/compare/rig-postgres-v0.1.5...rig-postgres-v0.1.6) - 2025-03-31
11 | 
12 | ### Other
13 | 
14 | - updated the following local packages: rig-core
15 | 
16 | ## [0.1.5](https://github.com/0xPlaygrounds/rig/compare/rig-postgres-v0.1.4...rig-postgres-v0.1.5) - 2025-03-17
17 | 
18 | ### Other
19 | 
20 | - updated the following local packages: rig-core
21 | 
22 | ## [0.1.4](https://github.com/0xPlaygrounds/rig/compare/rig-postgres-v0.1.3...rig-postgres-v0.1.4) - 2025-03-03
23 | 
24 | ### Other
25 | 
26 | - updated the following local packages: rig-core
27 | 
28 | ## [0.1.3](https://github.com/0xPlaygrounds/rig/compare/rig-postgres-v0.1.2...rig-postgres-v0.1.3) - 2025-02-17
29 | 
30 | ### Other
31 | 
32 | - updated the following local packages: rig-core
33 | 
34 | ## [0.1.2](https://github.com/0xPlaygrounds/rig/compare/rig-postgres-v0.1.1...rig-postgres-v0.1.2) - 2025-02-10
35 | 
36 | ### Other
37 | 
38 | - fix spelling errors in `Makefile` and `message.rs` (#284)
39 | 
40 | ## [0.1.1](https://github.com/0xPlaygrounds/rig/compare/rig-postgres-v0.1.0...rig-postgres-v0.1.1) - 2025-01-27
41 | 
42 | ### Other
43 | 
44 | - release (#203)
45 | 
46 | ## [0.1.0](https://github.com/0xPlaygrounds/rig/releases/tag/rig-postgres-v0.1.0) - 2025-01-27
47 | 
48 | ### Added
49 | 
50 | - *(rig-postgres)* postgres vector store integration (#231)
51 | 


--------------------------------------------------------------------------------
/rig-postgres/Cargo.toml:
--------------------------------------------------------------------------------
 1 | [package]
 2 | name = "rig-postgres"
 3 | version = "0.1.6"
 4 | edition = "2021"
 5 | description = "PostgreSQL-based vector store implementation for the rig framework"
 6 | license = "MIT"
 7 | readme = "README.md"
 8 | repository = "https://github.com/0xPlaygrounds/rig"
 9 | 
10 | [dependencies]
11 | rig-core = { path = "../rig-core", version = "0.11.0", features = ["derive"] }
12 | serde = { version = "1.0.215", features = ["derive"] }
13 | serde_json = "1.0.133"
14 | 
15 | tracing = "0.1.40"
16 | sqlx = { version = "0.8.3", features = [
17 |   "runtime-tokio",
18 |   "postgres",
19 |   "uuid",
20 |   "json",
21 | ] }
22 | pgvector = { version = "0.4", features = ["sqlx"] }
23 | uuid = { version = "1.11.0", features = ["v4", "serde"] }
24 | 
25 | [dev-dependencies]
26 | anyhow = "1.0.94"
27 | log = "0.4.22"
28 | tracing-subscriber = { version = "0.3", features = ["env-filter"] }
29 | tokio-test = "0.4.4"
30 | tokio = { version = "1.43.0", features = ["macros", "rt-multi-thread"] }
31 | 
32 | 
33 | testcontainers = "0.23.1"
34 | httpmock = "0.7.0"
35 | 
36 | dotenvy = "0.15.7"
37 | 


--------------------------------------------------------------------------------
/rig-postgres/LICENSE:
--------------------------------------------------------------------------------
1 | Copyright (c) 2024, Playgrounds Analytics Inc.
2 | 
3 | Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
4 | 
5 | The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
6 | 
7 | THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
8 | 


--------------------------------------------------------------------------------
/rig-postgres/Makefile:
--------------------------------------------------------------------------------
 1 | # Makefile
 2 | 
 3 | MAKEFLAGS += -j2
 4 | -include .env
 5 | export
 6 | 
 7 | CURRENT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
 8 | CURRENT_PATH := $(shell pwd)
 9 | DEFAULT_BRANCH := $(shell git remote show upstream | sed -n '/HEAD branch/s/.*: //p')
10 | AMM := ${HOME}/amm
11 | 
12 | .PHONY: gitRebase
13 | gitRebase:
14 | 	git checkout $(DEFAULT_BRANCH) && \
15 | 		git pull upstream $(DEFAULT_BRANCH) && \
16 | 		git push origin $(DEFAULT_BRANCH) && \
17 | 		git checkout $(CURRENT_BRANCH) && \
18 | 		git rebase $(DEFAULT_BRANCH)
19 | 		git push --force origin $(CURRENT_BRANCH)
20 | 
21 | .PHONY: gitAmend
22 | gitAmend:
23 | 	git add . && git commit --amend --no-edit && git push --force origin $(CURRENT_BRANCH)
24 | 
25 | 
26 | .PHONY: test
27 | test:
28 | 	cargo watch -qcx 'test'
29 | 
30 | .PHONY: fix
31 | fix:
32 | 	cargo clippy --fix
33 | 
34 | .PHONY: run
35 | run:
36 | 	 cargo run --example vector_search_postgres
37 | 


--------------------------------------------------------------------------------
/rig-postgres/examples/migrations/001_setup.sql:
--------------------------------------------------------------------------------
 1 | -- ensure extension is installed
 2 | CREATE EXTENSION IF NOT EXISTS vector;
 3 | 
 4 | -- create table with embeddings using 1536 dimensions (text-embedding-3-small)
 5 | CREATE TABLE documents (
 6 |   id uuid DEFAULT gen_random_uuid(), -- we can have repeated entries
 7 |   document jsonb NOT NULL,
 8 |   embedded_text text NOT NULL,
 9 |   embedding vector(1536)
10 | );
11 | 
12 | -- create index on embeddings
13 | CREATE INDEX IF NOT EXISTS document_embeddings_idx ON documents 
14 | USING hnsw(embedding vector_cosine_ops);
15 | 


--------------------------------------------------------------------------------
/rig-postgres/tests/migrations/001_setup.sql:
--------------------------------------------------------------------------------
 1 | -- ensure extension is installed
 2 | CREATE EXTENSION IF NOT EXISTS vector;
 3 | 
 4 | -- create table with embeddings using 1536 dimensions (text-embedding-3-small)
 5 | CREATE TABLE documents (
 6 |   id uuid DEFAULT gen_random_uuid(), -- we can have repeated entries
 7 |   document jsonb NOT NULL,
 8 |   embedded_text text NOT NULL,
 9 |   embedding vector(1536)
10 | );
11 | 
12 | -- create index on embeddings
13 | CREATE INDEX IF NOT EXISTS document_embeddings_idx ON documents 
14 | USING hnsw(embedding vector_cosine_ops);
15 | 


--------------------------------------------------------------------------------
/rig-qdrant/CHANGELOG.md:
--------------------------------------------------------------------------------
 1 | # Changelog
 2 | 
 3 | All notable changes to this project will be documented in this file.
 4 | 
 5 | The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
 6 | and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
 7 | 
 8 | ## [Unreleased]
 9 | 
10 | ## [0.1.11](https://github.com/0xPlaygrounds/rig/compare/rig-qdrant-v0.1.10...rig-qdrant-v0.1.11) - 2025-03-31
11 | 
12 | ### Other
13 | 
14 | - updated the following local packages: rig-core
15 | 
16 | ## [0.1.10](https://github.com/0xPlaygrounds/rig/compare/rig-qdrant-v0.1.9...rig-qdrant-v0.1.10) - 2025-03-17
17 | 
18 | ### Other
19 | 
20 | - updated the following local packages: rig-core
21 | 
22 | ## [0.1.9](https://github.com/0xPlaygrounds/rig/compare/rig-qdrant-v0.1.8...rig-qdrant-v0.1.9) - 2025-03-03
23 | 
24 | ### Added
25 | 
26 | - upsert documents into qdrant ([#301](https://github.com/0xPlaygrounds/rig/pull/301))
27 | 
28 | ## [0.1.8](https://github.com/0xPlaygrounds/rig/compare/rig-qdrant-v0.1.7...rig-qdrant-v0.1.8) - 2025-02-17
29 | 
30 | ### Other
31 | 
32 | - updated the following local packages: rig-core
33 | 
34 | ## [0.1.7](https://github.com/0xPlaygrounds/rig/compare/rig-qdrant-v0.1.6...rig-qdrant-v0.1.7) - 2025-02-10
35 | 
36 | ### Other
37 | 
38 | - updated the following local packages: rig-core
39 | 
40 | ## [0.1.6](https://github.com/0xPlaygrounds/rig/compare/rig-qdrant-v0.1.5...rig-qdrant-v0.1.6) - 2025-01-27
41 | 
42 | ### Other
43 | 
44 | - update Cargo.lock dependencies
45 | 
46 | ## [0.1.5](https://github.com/0xPlaygrounds/rig/compare/rig-qdrant-v0.1.4...rig-qdrant-v0.1.5) - 2025-01-13
47 | 
48 | ### Other
49 | 
50 | - Mock provider API in vector store integration tests (#186)
51 | 
52 | ## [0.1.4](https://github.com/0xPlaygrounds/rig/compare/rig-qdrant-v0.1.3...rig-qdrant-v0.1.4) - 2024-12-19
53 | 
54 | ### Other
55 | 
56 | - update Cargo.lock dependencies
57 | 
58 | ## [0.1.3](https://github.com/0xPlaygrounds/rig/compare/rig-qdrant-v0.1.2...rig-qdrant-v0.1.3) - 2024-12-03
59 | 
60 | ### Added
61 | 
62 | - embeddings API overhaul ([#120](https://github.com/0xPlaygrounds/rig/pull/120))
63 | 
64 | ### Other
65 | 
66 | - *(integration test)* Neo4J ([#133](https://github.com/0xPlaygrounds/rig/pull/133))
67 | - *(integration test)* Qdrant ([#134](https://github.com/0xPlaygrounds/rig/pull/134))
68 | 
69 | ## [0.1.2](https://github.com/0xPlaygrounds/rig/compare/rig-qdrant-v0.1.1...rig-qdrant-v0.1.2) - 2024-11-13
70 | 
71 | ### Other
72 | 
73 | - updated the following local packages: rig-core
74 | 


--------------------------------------------------------------------------------
/rig-qdrant/Cargo.toml:
--------------------------------------------------------------------------------
 1 | [package]
 2 | name = "rig-qdrant"
 3 | version = "0.1.11"
 4 | edition = "2021"
 5 | license = "MIT"
 6 | readme = "README.md"
 7 | description = "Rig vector store index integration for Qdrant. https://qdrant.tech"
 8 | repository = "https://github.com/0xPlaygrounds/rig"
 9 | 
10 | [dependencies]
11 | rig-core = { path = "../rig-core", version = "0.11.0" }
12 | serde_json = "1.0.128"
13 | serde = "1.0.210"
14 | qdrant-client = "1.13.0"
15 | uuid = { version = "1.13.1", features = ["v4"] }
16 | 
17 | [dev-dependencies]
18 | tokio = { version = "1.40.0", features = ["rt-multi-thread"] }
19 | anyhow = "1.0.89"
20 | testcontainers = "0.23.1"
21 | httpmock = "0.7.0"
22 | 
23 | [[example]]
24 | name = "qdrant_vector_search"
25 | required-features = ["rig-core/derive"]
26 | 
27 | 
28 | [[test]]
29 | name = "integration_tests"
30 | required-features = ["rig-core/derive"]
31 | 


--------------------------------------------------------------------------------
/rig-qdrant/LICENSE:
--------------------------------------------------------------------------------
1 | Copyright (c) 2024, Playgrounds Analytics Inc.
2 | 
3 | Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
4 | 
5 | The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
6 | 
7 | THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
8 | 


--------------------------------------------------------------------------------
/rig-qdrant/README.md:
--------------------------------------------------------------------------------
1 | # Rig-Qdrant
2 | Vector store index integration for [Qdrant](https://qdrant.tech/). This integration supports dense vector retrieval using Rig's embedding providers. It is also extensible to allow all [hybrid queries](https://qdrant.tech/documentation/concepts/hybrid-queries/) supported by Qdrant.
3 | 
4 | You can find end-to-end examples [here](https://github.com/0xPlaygrounds/rig/tree/main/rig-qdrant/examples).
5 | 


--------------------------------------------------------------------------------
/rig-qdrant/examples/qdrant_vector_search.rs:
--------------------------------------------------------------------------------
 1 | // To run this example:
 2 | //
 3 | // export OPENAI_API_KEY=<YOUR-API-KEY>
 4 | // docker run -p 6333:6333 -p 6334:6334 qdrant/qdrant
 5 | // cargo run --release --example qdrant_vector_search
 6 | //
 7 | // You can view the data at http://localhost:6333/dashboard
 8 | 
 9 | use std::env;
10 | 
11 | use anyhow::anyhow;
12 | use qdrant_client::{
13 |     qdrant::{CreateCollectionBuilder, Distance, QueryPointsBuilder, VectorParamsBuilder},
14 |     Qdrant,
15 | };
16 | use rig::{
17 |     embeddings::EmbeddingsBuilder,
18 |     providers::openai::{Client, TEXT_EMBEDDING_ADA_002},
19 |     vector_store::VectorStoreIndex,
20 |     Embed,
21 | };
22 | use rig_qdrant::QdrantVectorStore;
23 | 
24 | #[derive(Embed, serde::Deserialize, serde::Serialize, Debug)]
25 | struct Word {
26 |     id: String,
27 |     #[embed]
28 |     definition: String,
29 | }
30 | 
31 | #[tokio::main]
32 | async fn main() -> Result<(), anyhow::Error> {
33 |     const COLLECTION_NAME: &str = "rig-collection";
34 | 
35 |     let client = Qdrant::from_url("http://localhost:6334").build()?;
36 | 
37 |     // Create a collection with 1536 dimensions if it doesn't exist
38 |     // Note: Make sure the dimensions match the size of the embeddings returned by the
39 |     // model you are using
40 |     if !client.collection_exists(COLLECTION_NAME).await? {
41 |         client
42 |             .create_collection(
43 |                 CreateCollectionBuilder::new(COLLECTION_NAME)
44 |                     .vectors_config(VectorParamsBuilder::new(1536, Distance::Cosine)),
45 |             )
46 |             .await?;
47 |     }
48 | 
49 |     // Initialize OpenAI client.
50 |     // Get your API key from https://platform.openai.com/api-keys
51 |     let openai_api_key = env::var("OPENAI_API_KEY").expect("OPENAI_API_KEY not set");
52 |     let openai_client = Client::new(&openai_api_key);
53 | 
54 |     let model = openai_client.embedding_model(TEXT_EMBEDDING_ADA_002);
55 | 
56 |     let documents = EmbeddingsBuilder::new(model.clone())
57 |         .document(Word {
58 |             id: "0981d983-a5f8-49eb-89ea-f7d3b2196d2e".to_string(),
59 |             definition: "Definition of a *flurbo*: A flurbo is a green alien that lives on cold planets".to_string(),
60 |         })?
61 |         .document(Word {
62 |             id: "62a36d43-80b6-4fd6-990c-f75bb02287d1".to_string(),
63 |             definition: "Definition of a *glarb-glarb*: A glarb-glarb is a ancient tool used by the ancestors of the inhabitants of planet Jiro to farm the land.".to_string(),
64 |         })?
65 |         .document(Word {
66 |             id: "f9e17d59-32e5-440c-be02-b2759a654824".to_string(),
67 |             definition: "Definition of a *linglingdong*: A term used by inhabitants of the far side of the moon to describe humans.".to_string(),
68 |         })?
69 |         .build()
70 |         .await?;
71 | 
72 |     let query_params = QueryPointsBuilder::new(COLLECTION_NAME).with_payload(true);
73 |     let vector_store = QdrantVectorStore::new(client, model, query_params.build());
74 | 
75 |     vector_store
76 |         .insert_documents(documents)
77 |         .await
78 |         .map_err(|err| anyhow!("Couldn't insert documents: {err}"))?;
79 | 
80 |     let results = vector_store
81 |         .top_n::<Word>("What is a linglingdong?", 1)
82 |         .await?;
83 | 
84 |     println!("Results: {:?}", results);
85 | 
86 |     Ok(())
87 | }
88 | 


--------------------------------------------------------------------------------
/rig-sqlite/CHANGELOG.md:
--------------------------------------------------------------------------------
 1 | # Changelog
 2 | 
 3 | All notable changes to this project will be documented in this file.
 4 | 
 5 | The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
 6 | and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
 7 | 
 8 | ## [Unreleased]
 9 | 
10 | ## [0.1.8](https://github.com/0xPlaygrounds/rig/compare/rig-sqlite-v0.1.7...rig-sqlite-v0.1.8) - 2025-03-31
11 | 
12 | ### Other
13 | 
14 | - updated the following local packages: rig-core
15 | 
16 | ## [0.1.7](https://github.com/0xPlaygrounds/rig/compare/rig-sqlite-v0.1.6...rig-sqlite-v0.1.7) - 2025-03-17
17 | 
18 | ### Other
19 | 
20 | - updated the following local packages: rig-core
21 | 
22 | ## [0.1.6](https://github.com/0xPlaygrounds/rig/compare/rig-sqlite-v0.1.5...rig-sqlite-v0.1.6) - 2025-03-03
23 | 
24 | ### Other
25 | 
26 | - updated the following local packages: rig-core
27 | 
28 | ## [0.1.5](https://github.com/0xPlaygrounds/rig/compare/rig-sqlite-v0.1.4...rig-sqlite-v0.1.5) - 2025-02-17
29 | 
30 | ### Other
31 | 
32 | - updated the following local packages: rig-core
33 | 
34 | ## [0.1.4](https://github.com/0xPlaygrounds/rig/compare/rig-sqlite-v0.1.3...rig-sqlite-v0.1.4) - 2025-02-10
35 | 
36 | ### Other
37 | 
38 | - updated the following local packages: rig-core
39 | 
40 | ## [0.1.3](https://github.com/0xPlaygrounds/rig/compare/rig-sqlite-v0.1.2...rig-sqlite-v0.1.3) - 2025-01-27
41 | 
42 | ### Fixed
43 | 
44 | - *(rig-sqlite)* Use tokio-rusqlite from crates.io instead of custom crate (#158)
45 | 
46 | ### Other
47 | 
48 | - *(rig-sqlite)* Add integration test (#202)
49 | 
50 | ## [0.1.2](https://github.com/0xPlaygrounds/rig/compare/rig-sqlite-v0.1.1...rig-sqlite-v0.1.2) - 2025-01-13
51 | 
52 | ### Other
53 | 
54 | - updated the following local packages: rig-core
55 | 
56 | ## [0.1.1](https://github.com/0xPlaygrounds/rig/compare/rig-sqlite-v0.1.0...rig-sqlite-v0.1.1) - 2024-12-19
57 | 
58 | ### Other
59 | 
60 | - update Cargo.lock dependencies
61 | 
62 | ## [0.1.0](https://github.com/0xPlaygrounds/rig/releases/tag/rig-sqlite-v0.1.0) - 2024-12-03
63 | 
64 | ### Added
65 | 
66 | - Add support for Sqlite vector store ([#122](https://github.com/0xPlaygrounds/rig/pull/122))
67 | 
68 | ### Fixed
69 | 
70 | - rig-sqlite missing version in Cargo.toml ([#137](https://github.com/0xPlaygrounds/rig/pull/137))
71 | - *(rig-sqlite)* Fix missing rig-core version
72 | 


--------------------------------------------------------------------------------
/rig-sqlite/Cargo.toml:
--------------------------------------------------------------------------------
 1 | [package]
 2 | name = "rig-sqlite"
 3 | version = "0.1.8"
 4 | edition = "2021"
 5 | description = "SQLite-based vector store implementation for the rig framework"
 6 | license = "MIT"
 7 | 
 8 | [lib]
 9 | doctest = false
10 | 
11 | [dependencies]
12 | rig-core = { path = "../rig-core", version = "0.11.0",  features = ["derive"] }
13 | rusqlite = { version = "0.32", features = ["bundled"] }
14 | serde = { version = "1.0", features = ["derive"] }
15 | serde_json = "1.0"
16 | sqlite-vec = "0.1"
17 | tokio-rusqlite = { version = "0.6.0", features = ["bundled"], default-features = false }
18 | tracing = "0.1"
19 | zerocopy = "0.8.10"
20 | chrono = "0.4"
21 | 
22 | [dev-dependencies]
23 | anyhow = "1.0.86"
24 | httpmock = "0.7.0"
25 | tokio = { version = "1.38.0", features = ["macros", "rt-multi-thread"] }
26 | tracing-subscriber = { version = "0.3", features = ["env-filter"] }
27 | 


--------------------------------------------------------------------------------
/rig-sqlite/LICENSE:
--------------------------------------------------------------------------------
1 | Copyright (c) 2024, Playgrounds Analytics Inc.
2 | 
3 | Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
4 | 
5 | The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
6 | 
7 | THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
8 | 


--------------------------------------------------------------------------------
/rig-sqlite/README.md:
--------------------------------------------------------------------------------
 1 | <div style="display: flex; align-items: center; justify-content: center;">
 2 |     <picture>
 3 |         <source media="(prefers-color-scheme: dark)" srcset="../img/rig_logo_dark.svg">
 4 |         <source media="(prefers-color-scheme: light)" srcset="../img/rig_logo.svg">
 5 |         <img src="../img/rig_logo.svg" width="200" alt="Rig logo">
 6 |     </picture>
 7 |     <span style="font-size: 48px; margin: 0 20px; font-weight: regular; font-family: Open Sans, sans-serif;"> + </span>
 8 |     <picture>
 9 |         <source media="(prefers-color-scheme: dark)" srcset="https://www.sqlite.org/images/sqlite370_banner.gif">
10 |         <source media="(prefers-color-scheme: light)" srcset="https://www.sqlite.org/images/sqlite370_banner.gif">
11 |         <img src="https://www.sqlite.org/images/sqlite370_banner.gif" width="200" alt="SQLite logo">
12 |     </picture>
13 | </div>
14 | 
15 | <br><br>
16 | 
17 | ## Rig-SQLite
18 | 
19 | This companion crate implements a Rig vector store based on SQLite.
20 | 
21 | ## Usage
22 | 
23 | Add the companion crate to your `Cargo.toml`, along with the rig-core crate:
24 | 
25 | ```toml
26 | [dependencies]
27 | rig-sqlite = "0.1.3"
28 | rig-core = "0.4.0"
29 | ```
30 | 
31 | You can also run `cargo add rig-sqlite rig-core` to add the most recent versions of the dependencies to your project.
32 | 
33 | See the [`/examples`](./examples) folder for usage examples.
34 | 
35 | ## Important Note
36 | 
37 | Before using the SQLite vector store, you must [initialize the SQLite vector extension](https://alexgarcia.xyz/sqlite-vec/rust.html). Add this code before creating your connection:
38 | 
39 | ```rust
40 | use rusqlite::ffi::sqlite3_auto_extension;
41 | use sqlite_vec::sqlite3_vec_init;
42 | 
43 | unsafe {
44 |     sqlite3_auto_extension(Some(std::mem::transmute(sqlite3_vec_init as *const ())));
45 | }
46 | ```
47 | 


--------------------------------------------------------------------------------
/rig-surrealdb/CHANGELOG.md:
--------------------------------------------------------------------------------
 1 | # Changelog
 2 | 
 3 | All notable changes to this project will be documented in this file.
 4 | 
 5 | The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
 6 | and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
 7 | 
 8 | ## [Unreleased]
 9 | 
10 | ## [0.1.3](https://github.com/0xPlaygrounds/rig/compare/rig-surrealdb-v0.1.2...rig-surrealdb-v0.1.3) - 2025-03-31
11 | 
12 | ### Other
13 | 
14 | - updated the following local packages: rig-core
15 | 
16 | ## [0.1.2](https://github.com/0xPlaygrounds/rig/compare/rig-surrealdb-v0.1.1...rig-surrealdb-v0.1.2) - 2025-03-17
17 | 
18 | ### Other
19 | 
20 | - updated the following local packages: rig-core
21 | 
22 | ## [0.1.1](https://github.com/0xPlaygrounds/rig/compare/rig-surrealdb-v0.1.0...rig-surrealdb-v0.1.1) - 2025-03-03
23 | 
24 | ### Other
25 | 
26 | - updated the following local packages: rig-core
27 | 


--------------------------------------------------------------------------------
/rig-surrealdb/Cargo.toml:
--------------------------------------------------------------------------------
 1 | [package]
 2 | name = "rig-surrealdb"
 3 | version = "0.1.3"
 4 | edition = "2021"
 5 | description = "SurrealDB vector store implementation for the rig framework"
 6 | license = "MIT"
 7 | 
 8 | [dependencies]
 9 | surrealdb = { version = "2.1.4", features = ["protocol-ws", "kv-mem"] }
10 | rig-core = { path = "../rig-core", version = "0.11.0", features = ["derive"] }
11 | serde = { version = "1.0", features = ["derive"] }
12 | serde_json = "1.0"
13 | tracing = "0.1"
14 | uuid = { version = "1.13.1", features = ["v4"] }
15 | 
16 | [dev-dependencies]
17 | anyhow = "1.0.86"
18 | tokio = { version = "1.38.0", features = ["macros", "rt-multi-thread"] }
19 | tracing-subscriber = { version = "0.3", features = ["env-filter"] }
20 | 
21 | [[example]]
22 | name = "vector_search_surreal"
23 | required-features = ["rig-core/derive"]
24 | 


--------------------------------------------------------------------------------
/rig-surrealdb/README.md:
--------------------------------------------------------------------------------
 1 | # Rig SurrealDB integration
 2 | This crate integrates SurrealDB into Rig, allowing you to easily use RAG with this database.
 3 | 
 4 | ## Installation
 5 | To install this crate, run the following command in a Rust project directory which will add `rig-surrealdb` as a dependency (requires `rig-core` added for intended usage):
 6 | ```bash
 7 | cargo add rig-surrealdb
 8 | ```
 9 | 
10 | There's a few different ways you can run SurrealDB:
11 | - [Install it locally and run it](https://surrealdb.com/docs/surrealdb/installation/linux)
12 | - [Through a Docker container, either locally or on Docker-compatible architecture](https://surrealdb.com/docs/surrealdb/installation/running/docker)
13 |   - `docker run --rm --pull always -p 8000:8000 surrealdb/surrealdb:latest start --username root --password root` starts up a SurrealDB instance at port 8000 with the username and password as "root".
14 | - [Using SurrealDB's cloud offering](https://surrealdb.com/cloud)
15 |   - Using the cloud offering you can manage your SurrealDB instance through their web UI.
16 | 
17 | ## How to run the example
18 | To run the example, add your OpenAI API key as an environment variable:
19 | ```bash
20 | export OPENAI_API_KEY=my_key
21 | ```
22 | 
23 | Finally, use the following command below to run the example:
24 | ```bash
25 | cargo run --example vector_search_surreal --features rig-core/derive
26 | ```
27 | 


--------------------------------------------------------------------------------
/rig-surrealdb/examples/migrations.surql:
--------------------------------------------------------------------------------
 1 | -- define table & fields
 2 | DEFINE TABLE documents SCHEMAFULL;
 3 | DEFINE field document on table documents type object;
 4 | DEFINE field embedding on table documents type array<float>;
 5 | DEFINE field embedded_text on table documents type string;
 6 | 
 7 | -- define index on embedding field
 8 | DEFINE INDEX IF NOT EXISTS words_embedding_vector_index ON documents
 9 |      FIELDS embedding
10 |      MTREE DIMENSION 1536
11 |      DIST COSINE;
12 | 


--------------------------------------------------------------------------------
/rig-surrealdb/examples/vector_search_surreal.rs:
--------------------------------------------------------------------------------
 1 | use rig::{embeddings::EmbeddingsBuilder, vector_store::VectorStoreIndex, Embed};
 2 | use rig_surrealdb::{Mem, SurrealVectorStore};
 3 | use serde::{Deserialize, Serialize};
 4 | use surrealdb::Surreal;
 5 | 
 6 | // A vector search needs to be performed on the `definitions` field, so we derive the `Embed` trait for `WordDefinition`
 7 | // and tag that field with `#[embed]`.
 8 | // We are not going to store the definitions on our database so we skip the `Serialize` trait
 9 | #[derive(Embed, Serialize, Deserialize, Clone, Debug, Eq, PartialEq, Default)]
10 | struct WordDefinition {
11 |     word: String,
12 |     #[serde(skip)] // we don't want to serialize this field, we use only to create embeddings
13 |     #[embed]
14 |     definition: String,
15 | }
16 | 
17 | impl std::fmt::Display for WordDefinition {
18 |     fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
19 |         write!(f, "{}", self.word)
20 |     }
21 | }
22 | 
23 | #[tokio::main]
24 | async fn main() -> Result<(), anyhow::Error> {
25 |     // Create OpenAI client
26 |     let openai_client = rig::providers::openai::Client::from_env();
27 |     let model = openai_client.embedding_model(rig::providers::openai::TEXT_EMBEDDING_3_SMALL);
28 | 
29 |     let surreal = Surreal::new::<Mem>(()).await?;
30 | 
31 |     surreal.use_ns("example").use_db("example").await?;
32 | 
33 |     // create test documents with mocked embeddings
34 |     let words = vec![
35 |         WordDefinition {
36 |             word: "flurbo".to_string(),
37 |             definition: "1. *flurbo* (name): A fictional digital currency that originated in the animated series Rick and Morty.".to_string()
38 |         },
39 |         WordDefinition {
40 |             word: "glarb-glarb".to_string(),
41 |             definition: "1. *glarb-glarb* (noun): A fictional creature found in the distant, swampy marshlands of the planet Glibbo in the Andromeda galaxy.".to_string()
42 |         },
43 |         WordDefinition {
44 |             word: "linglingdong".to_string(),
45 |             definition: "1. *linglingdong* (noun): A term used by inhabitants of the far side of the moon to describe humans.".to_string(),
46 |         }];
47 | 
48 |     let documents = EmbeddingsBuilder::new(model.clone())
49 |         .documents(words)
50 |         .unwrap()
51 |         .build()
52 |         .await
53 |         .expect("Failed to create embeddings");
54 | 
55 |     // init vector store
56 |     let vector_store = SurrealVectorStore::with_defaults(model, surreal);
57 | 
58 |     vector_store.insert_documents(documents).await?;
59 | 
60 |     // query vector
61 |     let query = "What does \"glarb-glarb\" mean?";
62 | 
63 |     let results = vector_store.top_n::<WordDefinition>(query, 2).await?;
64 | 
65 |     println!("#{} results for query: {}", results.len(), query);
66 |     for (distance, _id, doc) in results.iter() {
67 |         println!("Result distance {} for word: {}", distance, doc);
68 | 
69 |         // expected output
70 |         // Result distance 0.693218142100547 for word: glarb-glarb
71 |         // Result distance 0.2529120980283861 for word: linglingdong
72 |     }
73 | 
74 |     Ok(())
75 | }
76 | 


---------------------------------------------------------